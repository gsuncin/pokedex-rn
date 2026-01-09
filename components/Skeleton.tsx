import React from "react";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import { LayoutChangeEvent, StyleProp, View, ViewStyle } from "react-native";

type SkeletonShape = "circle" | "rectangle";

export interface SkeletonProps {
  shape?: SkeletonShape;

  /**
   * The wrapper View style. Use this to control the size
   * (e.g. { height: 24, width: 200 } or { flex: 1 }).
   */
  style?: StyleProp<ViewStyle>;

  /** ContentLoader animation speed */
  speed?: number;

  /** For rectangle rounding */
  rx?: number;
  ry?: number;

  /** For circle radius override (otherwise it uses min(w, h)/2) */
  radius?: number;

  backgroundColor?: string;
  foregroundColor?: string;
}

type Size = { w: number; h: number };

export default function Skeleton({
  shape = "rectangle",
  style,
  speed = 2,
  rx = 8,
  ry = 8,
  radius,
  backgroundColor = "#e0e0e0",
  foregroundColor = "#c0c0c0",
}: SkeletonProps) {
  const [size, setSize] = React.useState<Size | null>(null);

  const onLayout = React.useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;

    // Avoid state updates when nothing changes
    if (width > 0 && height > 0) {
      setSize((prev) =>
        prev?.w === width && prev?.h === height ? prev : { w: width, h: height }
      );
    }
  }, []);

  return (
    <View style={style} onLayout={onLayout}>
      {size ? (
        <ContentLoader
          speed={speed}
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
        >
          {shape === "circle" ? (
            <Circle
              cx={size.w / 2}
              cy={size.h / 2}
              r={radius ?? Math.min(size.w, size.h) / 2}
            />
          ) : (
            <Rect x={0} y={0} width={size.w} height={size.h} rx={rx} ry={ry} />
          )}
        </ContentLoader>
      ) : null}
    </View>
  );
}
