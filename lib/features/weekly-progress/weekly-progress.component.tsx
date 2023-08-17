import * as d3 from 'd3';
import { format } from 'date-fns';
import { Fragment, useMemo } from 'react';
import { Dimensions } from 'react-native';
import { G, Rect, Svg, Text as SvgText } from 'react-native-svg';
import { Circle, View, XStack, YStack, getTokens } from 'tamagui';

import { Card, Text } from '../../components';
import { getCurrentWeekdays } from '../../utils';

const weekDays = getCurrentWeekdays();

const mock = weekDays.map((date) => ({
  x: format(date, 'EEE'),
  y: Math.random() * 10,
}));

export function WeeklyProgress() {
  return (
    <Card p={0}>
      <YStack px="$4" py="$4" gap="$1.5">
        <Text type="title-2">Weekly progress</Text>
        <XStack alignItems="center" gap="$2">
          <Circle size={14} backgroundColor="$blue10" />
          <Text type="footnote">Reviewed cards</Text>
        </XStack>
      </YStack>
      <View pb="$4" alignItems="center" justifyContent="center">
        <ProgressChart data={mock} />
      </View>
    </Card>
  );
}

type BarChartData = {
  x: string;
  y: number;
};

export type ProgressChartProps = {
  data: BarChartData[];
};

const WIDTH = Dimensions.get('window').width;
const HEIGHT = 150;
const MARGIN = { top: 0, right: 20, bottom: 20, left: 40 };

function ProgressChart(props: ProgressChartProps) {
  const { data } = props;

  const { x, y } = useMemo(() => {
    const xDomain = data.map((d) => d.x);
    const xRange = [MARGIN.left, WIDTH - MARGIN.right];

    const x = d3.scaleBand().domain(xDomain).range(xRange).paddingInner(0.55);

    const yDomain = [0, d3.max(data, (d) => d.y)!];
    const yRange = [HEIGHT - MARGIN.bottom, MARGIN.top];

    const y = d3.scaleLinear().domain(yDomain).range(yRange);

    return { x, y };
  }, [data]);

  return (
    <>
      <Svg
        width={WIDTH}
        height={HEIGHT}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        style={{ height: 'auto', maxWidth: '100%' }}
      >
        {/* BARS */}
        <G>
          {data.map((d) => (
            <Fragment key={d.x}>
              <Rect
                fill={getTokens().color.$gray3Light.val}
                x={x(d.x)}
                y={0}
                width={x.bandwidth()}
                height={y(0)}
                rx="12"
                ry="12"
              />
              <Rect
                fill={getTokens().color.$blue10Light.val}
                x={x(d.x)}
                y={y(d.y)}
                width={x.bandwidth()}
                height={y(0) - y(d.y)}
                rx="12"
                ry="12"
              />
            </Fragment>
          ))}
        </G>
        {/* X AXIS */}
        <G>
          {data.map((d) => (
            <SvgText
              key={d.x}
              x={x(d.x)}
              y={HEIGHT}
              font={{ fontFamily: 'SFProRoundedMedium', fontSize: 14 }}
            >
              {d.x}
            </SvgText>
          ))}
        </G>
        <G>
          {y.ticks(3).map((tick, idx) => (
            <SvgText
              key={idx}
              x={-25}
              y={y(tick)}
              transform={[{ translateX: MARGIN.left }]}
              font={{ fontFamily: 'SFProRoundedMedium', fontSize: 14 }}
              fill={getTokens().color.gray8Light.val}
            >
              {tick}
            </SvgText>
          ))}
        </G>
      </Svg>
    </>
  );
}
