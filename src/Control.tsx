import {
  Container,
  Input,
  VStack,
  Text,
  Button,
  Grid,
  GridItem,
  Divider,
} from "@hope-ui/solid";
import { createEffect, createSignal, Setter } from "solid-js";
import type { IImgOption, ITextOption } from "./App";

function getXYRange(w: number, h: number) {
  const threshold = 0.5;
  return {
    x: { min: -w * threshold, max: w * threshold },
    y: { min: -h * 2 * threshold, max: h * 0.5 * threshold },
  };
}

interface IControlProps {
  setTextOption: Setter<ITextOption>;
  setImgOption: Setter<IImgOption>;
  canvasSize: { w: number; h: number };
}

export default function Control(props: IControlProps) {
  const [size, setSize] = createSignal(100);

  const handleTextOption = (newTextOption: {
    x?: number;
    y?: number;
    text?: string;
  }) => {
    props.setTextOption((old: ITextOption) => ({ ...old, ...newTextOption }));
  };

  const range = getXYRange(props.canvasSize.w, props.canvasSize.h);

  const handleUpload = (e) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(e.currentTarget.files[0]);
    props.setImgOption((old) => ({ ...old, img }));
  };

  return (
    <Container>
      <VStack gap="$4">
        <Input
          maxW="250px"
          placeholder="在這邊打字"
          onInput={(e) =>
            handleTextOption({
              text: e.currentTarget.value.replace(/\\n/g, "\n"),
            })
          }
        />
        <XYSlider
          x={range.x}
          y={range.y}
          onChange={(x, y) => handleTextOption({ x, y })}
        />
        <Divider />
        <input type="file" onChange={handleUpload} />
        <XYSlider
          x={{ min: -props.canvasSize.w, max: props.canvasSize.w }}
          y={{ min: -props.canvasSize.h, max: props.canvasSize.h }}
          onChange={(x, y) => props.setImgOption((old) => ({ ...old, x, y }))}
        />
        <Grid
          templateRows="repeat(2, 1fr)"
          templateColumns=" 0.25fr 1fr 0.35fr"
          gap="$4"
          alignItems="center"
        >
          <GridItem rowSpan={1} colSpan={1}>
            <Text textAlign="end">大小</Text>
          </GridItem>
          <GridItem colSpan={1}>
            <input
              type="range"
              value={size()}
              min="0"
              max="300"
              onInput={(e) => {
                setSize(e.currentTarget.valueAsNumber);
                props.setImgOption((old) => ({
                  ...old,
                  size: e.currentTarget.valueAsNumber / 100,
                }));
              }}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <Button
              onClick={() =>
                setSize((old) => {
                  props.setImgOption((old) => ({
                    ...old,
                    size: 1,
                  }));
                  return 100;
                })
              }
            >
              重設
            </Button>
          </GridItem>
        </Grid>
      </VStack>
    </Container>
  );
}

interface IXYSlider {
  onChange: (x: number, y: number) => void;
  x: { min: number; max: number };
  y: { min: number; max: number };
}

function XYSlider(props: IXYSlider) {
  const [x, setX] = createSignal(0);
  const [y, setY] = createSignal(0);

  createEffect(() => {
    props.onChange(x(), y());
  });

  return (
    <Grid
      templateRows="repeat(2, 1fr)"
      templateColumns=" 0.25fr 1fr 0.35fr"
      gap="$4"
      alignItems="center"
    >
      <GridItem rowSpan={1} colSpan={1}>
        <Text textAlign="end">X</Text>
      </GridItem>
      <GridItem colSpan={1}>
        <input
          type="range"
          value={x()}
          min={props.x.min}
          max={props.x.max}
          onInput={(e) => setX(e.currentTarget.valueAsNumber)}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <Button onClick={() => setX(0)}>重設</Button>
      </GridItem>
      <GridItem rowSpan={1} colSpan={1}>
        <Text textAlign="end">Y</Text>
      </GridItem>
      <GridItem colSpan={1}>
        <input
          type="range"
          value={y()}
          min={props.y.min}
          max={props.y.max}
          onInput={(e) => setY(e.currentTarget.valueAsNumber)}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <Button onClick={() => setY(0)}>重設</Button>
      </GridItem>
    </Grid>
  );
}
