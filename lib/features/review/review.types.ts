import { SuperMemoGrade } from 'supermemo';

export type Grade = {
  label: string;
  grade: SuperMemoGrade;
  color: string;
};

export type BottomBarState = 'grade-visible' | 'flip-visible' | 'hidden';
