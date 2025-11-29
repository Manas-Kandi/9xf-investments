import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  PanResponder,
  Animated,
} from 'react-native';
import { color, type, space } from '../constants/design-system';

interface InvestmentChartProps {
  data: number[];
  labels: string[];
  totalValue: number;
  totalInvested: number;
}

const { width: screenWidth } = Dimensions.get('window');

export default function InvestmentChart({
  data,
  labels,
  totalValue,
  totalInvested,
}: InvestmentChartProps) {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const animatedValue = new Animated.Value(0);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      setSelectedPoint(null);
    },
    onPanResponderMove: (evt, gestureState) => {
      const chartWidth = screenWidth - space.screenX * 2 - space.large * 2;
      const pointIndex = Math.round((gestureState.moveX / chartWidth) * (data.length - 1));
      
      if (pointIndex >= 0 && pointIndex < data.length) {
        setSelectedPoint(pointIndex);
        Animated.spring(animatedValue, {
          toValue: pointIndex,
          useNativeDriver: false,
        }).start();
      }
    },
    onPanResponderRelease: () => {
      setTimeout(() => setSelectedPoint(null), 2000);
    },
  });

  const percentageGain = ((totalValue - totalInvested) / totalInvested) * 100;
  const isPositive = percentageGain >= 0;

  const getBarHeight = (value: number) => {
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const valueRange = maxValue - minValue;
    const normalizedValue = (value - minValue) / valueRange;
    return normalizedValue * 120; // Max height of 120px
  };

  const getBarPosition = (index: number) => {
    const chartWidth = screenWidth - space.screenX * 2 - space.large * 2;
    const barWidth = chartWidth / data.length;
    return index * barWidth + barWidth / 2;
  };

  return (
    <View style={styles.container}>
      {/* Header with total value */}
      <View style={styles.header}>
        <View>
          <Text style={styles.totalValueLabel}>Total Value</Text>
          <Text style={styles.totalValue}>
            ${totalValue.toLocaleString()}
          </Text>
          <View style={styles.gainRow}>
            <Text style={[styles.gainText, { color: isPositive ? color.success : color.error }]}>
              {isPositive ? '+' : ''}{percentageGain.toFixed(2)}%
            </Text>
            <Text style={styles.gainSubtext}>
              from ${totalInvested.toLocaleString()} invested
            </Text>
          </View>
        </View>
        <View style={[styles.gainBadge, { backgroundColor: isPositive ? color.success + '20' : color.error + '20' }]}>
          <Text style={[styles.gainBadgeText, { color: isPositive ? color.success : color.error }]}>
            {isPositive ? '+' : ''}${(totalValue - totalInvested).toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Chart */}
      <View style={styles.chartContainer} {...panResponder.panHandlers}>
        {/* Grid lines */}
        <View style={styles.grid}>
          {[0, 1, 2, 3, 4].map((i) => (
            <View
              key={i}
              style={[
                styles.gridLine,
                {
                  bottom: i * 30,
                },
              ]}
            />
          ))}
        </View>

        {/* Bars */}
        <View style={styles.barsContainer}>
          {data.map((value, index) => {
            const barHeight = getBarHeight(value);
            const isSelected = selectedPoint === index;
            
            return (
              <View key={index} style={styles.barWrapper}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: barHeight,
                      backgroundColor: isPositive ? color.success : color.error,
                      opacity: isSelected ? 1 : 0.7,
                      transform: [{ scaleY: isSelected ? 1.05 : 1 }],
                    },
                  ]}
                />
                {isSelected && (
                  <View style={[styles.selectedIndicator, { backgroundColor: isPositive ? color.success : color.error }]} />
                )}
              </View>
            );
          })}
        </View>

        {/* Selected point value */}
        {selectedPoint !== null && (
          <View
            style={[
              styles.selectedPoint,
              {
                left: getBarPosition(selectedPoint) - 40,
              },
            ]}
          >
            <Text style={styles.pointValueText}>${data[selectedPoint].toLocaleString()}</Text>
            <Text style={styles.pointLabel}>{labels[selectedPoint]}</Text>
          </View>
        )}
      </View>

      {/* X-axis labels */}
      <View style={styles.xAxisContainer}>
        {labels.map((label, index) => (
          <Text key={index} style={styles.xAxisLabel}>
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.bgCard,
    borderRadius: 20,
    padding: space.large,
    marginBottom: space.large,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: space.large,
  },
  totalValueLabel: {
    ...type.bodySmall,
    color: color.textSecondary,
    marginBottom: space.micro,
  },
  totalValue: {
    ...type.displayLarge,
    color: color.textPrimary,
    marginBottom: space.small,
  },
  gainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.small,
  },
  gainText: {
    ...type.headlineSmall,
    fontWeight: '600',
  },
  gainSubtext: {
    ...type.bodySmall,
    color: color.textSecondary,
  },
  gainBadge: {
    paddingHorizontal: space.small,
    paddingVertical: space.micro,
    borderRadius: 12,
  },
  gainBadgeText: {
    ...type.labelMedium,
    fontWeight: '600',
  },
  chartContainer: {
    height: 200,
    marginBottom: space.small,
    position: 'relative',
  },
  grid: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 30,
    top: 10,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: color.border,
    opacity: 0.3,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: space.small,
    paddingBottom: 30,
    height: 160,
  },
  barWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  bar: {
    width: '60%',
    borderRadius: 4,
    minHeight: 2,
  },
  selectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
    top: -4,
  },
  selectedPoint: {
    position: 'absolute',
    top: 10,
    width: 80,
    backgroundColor: color.bgCard,
    paddingHorizontal: space.small,
    paddingVertical: space.micro,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pointValueText: {
    ...type.bodySmall,
    fontWeight: '600',
    color: color.textPrimary,
    textAlign: 'center',
  },
  pointLabel: {
    ...type.bodySmall,
    color: color.textSecondary,
    textAlign: 'center',
  },
  xAxisContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: space.small,
  },
  xAxisLabel: {
    ...type.bodySmall,
    color: color.textTertiary,
    flex: 1,
    textAlign: 'center',
  },
});
