import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthModel, BaseAuthStore } from "pocketbase";

export class AsyncAuthStore extends BaseAuthStore {
  /**
   * @param {String} storageKey
   * @param queue
   */
  constructor(
    public storageKey: string = "pb_auth",
    private queue: any[] = []
  ) {
    super();

    this.storageKey = storageKey;
    this.queue = [];

    this._enqueue(async () => {
      const raw = await AsyncStorage.getItem(this.storageKey);
      if (raw) {
        const decoded = JSON.parse(raw);
        this.save(decoded.token, decoded.model);
      }
    });
  }

  /**
   * @inheritdoc
   */
  save(token: string, model: AuthModel) {
    super.save(token, model);

    this._enqueue(() => {
      return AsyncStorage.setItem(
        this.storageKey,
        JSON.stringify({ token, model })
      );
    });
  }

  /**
   * @inheritdoc
   */
  clear() {
    super.clear();

    this._enqueue(() => {
      return AsyncStorage.removeItem(this.storageKey);
    });
  }

  /**
   * Appends an async function to the queue.
   */
  _enqueue(asyncCallback: any) {
    this.queue.push(asyncCallback);

    if (this.queue.length === 1) this._dequeue();
  }

  /**
   * Starts the queue processing.
   */
  _dequeue() {
    if (!this.queue.length) return;

    this.queue[0]().finally(() => {
      this.queue.shift();

      if (!this.queue.length) return;

      this._dequeue();
    });
  }
}
