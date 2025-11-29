import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  PanResponder,
} from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { color, type, space } from '../constants/design-system';

interface InvestmentChartProps {
  data: number[];
  labels: string[];
  totalValue: number;
  totalInvested: number;
}

const { width: screenWidth } = Dimensions.get('window');
const CHART_HEIGHT = 120;
const CHART_PADDING = 20;

export default function InvestmentChart({
  data,
  labels,
  totalValue,
  totalInvested,
}: InvestmentChartProps) {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  const chartWidth = screenWidth - space.screenX * 2;
  const percentageGain = ((totalValue - totalInvested) / totalInvested) * 100;
  const isPositive = percentageGain >= 0;
  const lineColor = isPositive ? color.success : color.error;

  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const valueRange = maxValue - minValue || 1;

  const getY = (value: number) => {
    const normalized = (value - minValue) / valueRange;
    return CHART_HEIGHT - normalized * (CHART_HEIGHT - CHART_PADDING * 2) - CHART_PADDING;
  };

  const getX = (index: number) => {
    return (index / (data.length - 1)) * (chartWidth - CHART_PADDING * 2) + CHART_PADDING;
  };

  // Generate smooth line path
  const generateLinePath = () => {
    if (data.length < 2) return '';
    
    let path = `M ${getX(0)} ${getY(data[0])}`;
    
    for (let i = 1; i < data.length; i++) {
      const x = getX(i);
      const y = getY(data[i]);
      const prevX = getX(i - 1);
      const prevY = getY(data[i - 1]);
      
      // Bezier curve for smooth line
      const cpX1 = prevX + (x - prevX) / 3;
      const cpX2 = prevX + (x - prevX) * 2 / 3;
      
      path += ` C ${cpX1} ${prevY}, ${cpX2} ${y}, ${x} ${y}`;
    }
    
    return path;
  };

  // Generate gradient fill path
  const generateFillPath = () => {
    const linePath = generateLinePath();
    if (!linePath) return '';
    
    const lastX = getX(data.length - 1);
    const firstX = getX(0);
    
    return `${linePath} L ${lastX} ${CHART_HEIGHT} L ${firstX} ${CHART_HEIGHT} Z`;
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      const touchX = evt.nativeEvent.locationX;
      const pointIndex = Math.round(((touchX - CHART_PADDING) / (chartWidth - CHART_PADDING * 2)) * (data.length - 1));
      if (pointIndex >= 0 && pointIndex < data.length) {
        setSelectedPoint(pointIndex);
      }
    },
    onPanResponderMove: (evt) => {
      const touchX = evt.nativeEvent.locationX;
      const pointIndex = Math.round(((touchX - CHART_PADDING) / (chartWidth - CHART_PADDING * 2)) * (data.length - 1));
      if (pointIndex >= 0 && pointIndex < data.length) {
        setSelectedPoint(pointIndex);
      }
    },
    onPanResponderRelease: () => {
      setTimeout(() => setSelectedPoint(null), 2000);
    },
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.totalValue}>${totalValue.toLocaleString()}</Text>
        <Text style={[styles.gainText, { color: lineColor }]}>
          {isPositive ? '+' : ''}{percentageGain.toFixed(2)}%
        </Text>
      </View>

      {/* Line Chart */}
      <View style={styles.chartContainer} {...panResponder.panHandlers}>
        <Svg width={chartWidth} height={CHART_HEIGHT}>
          <Defs>
            <LinearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={lineColor} stopOpacity={0.2} />
              <Stop offset="100%" stopColor={lineColor} stopOpacity={0} />
            </LinearGradient>
          </Defs>
          
          {/* Gradient fill */}
          <Path
            d={generateFillPath()}
            fill="url(#fillGradient)"
          />
          
          {/* Line */}
          <Path
            d={generateLinePath()}
            stroke={lineColor}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Selected point */}
          {selectedPoint !== null && (
            <Circle
              cx={getX(selectedPoint)}
              cy={getY(data[selectedPoint])}
              r={6}
              fill={lineColor}
              stroke={color.bgPrimary}
              strokeWidth={2}
            />
          )}
        </Svg>

        {/* Selected point tooltip */}
        {selectedPoint !== null && (
          <View
            style={[
              styles.tooltip,
              {
                left: Math.min(Math.max(getX(selectedPoint) - 40, 0), chartWidth - 80),
                top: getY(data[selectedPoint]) - 45,
              },
            ]}
          >
            <Text style={styles.tooltipValue}>${data[selectedPoint].toLocaleString()}</Text>
            <Text style={styles.tooltipLabel}>{labels[selectedPoint]}</Text>
          </View>
        )}
      </View>

      {/* X-axis labels */}
      <View style={styles.xAxisContainer}>
        <Text style={styles.xAxisLabel}>{labels[0]}</Text>
        <Text style={styles.xAxisLabel}>{labels[Math.floor(labels.length / 2)]}</Text>
        <Text style={styles.xAxisLabel}>{labels[labels.length - 1]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: space.large,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: space.medium,
  },
  totalValue: {
    ...type.displayLarge,
    color: color.textPrimary,
  },
  gainText: {
    ...type.headlineSmall,
    fontWeight: '600',
  },
  chartContainer: {
    height: CHART_HEIGHT,
    position: 'relative',
  },
  tooltip: {
    position: 'absolute',
    width: 80,
    alignItems: 'center',
  },
  tooltipValue: {
    ...type.labelMedium,
    fontWeight: '600',
    color: color.textPrimary,
  },
  tooltipLabel: {
    ...type.bodySmall,
    color: color.textSecondary,
  },
  xAxisContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: space.small,
  },
  xAxisLabel: {
    ...type.bodySmall,
    color: color.textTertiary,
  },
});
