import {
  Flex,
  Box,
  VStack,
  HStack,
  Image,
  Divider,
  Icon,
  IconProps,
} from "@hope-ui/solid";
import Control from "./Control";
import Draw from "./Draw";
import { createSignal, For, Index } from "solid-js";
import bg1 from "./images/do_you_know_what_is_this/bg.png";
import bg2 from "./images/although_i_am_not_mathematician/bg.png";
import bg3 from "./images/ya/bg.png";

export interface ITextOption {
  x: number;
  y: number;
  text: string;
}

export interface IImgOption {
  x: number;
  y: number;
  img: HTMLImageElement | null;
  size: number;
}

export interface IChooseImage {
  src: string;
  name: string;
  selected: boolean;
}

export const CANVAS_SIZE = {
  w: 1920,
  h: 1080,
};

export default function App() {
  const [textOption, setTextOption] = createSignal({ x: 0, y: 0, text: "" });
  const [imgOption, setImgOption] = createSignal({
    x: 0,
    y: 0,
    img: null,
    size: 1,
  });
  const [chooseImages, setChooseImages] = createSignal([
    { src: bg1, name: "did_you_know_what_is_this", selected: false },
    { src: bg2, name: "although_i_am_not_mathematician", selected: false },
    { src: bg3, name: "ya", selected: false },
  ]);
  const selectedImg = () => {
    let bgImg = chooseImages().find((img) => img.selected);
    if (!bgImg)
      return {
        src: "",
        name: "",
        selected: true,
      };
    return bgImg;
  };

  return (
    <Flex>
      <VStack gap="$4">
        <Box flex="1">
          <Draw
            canvasSize={CANVAS_SIZE}
            bgImg={selectedImg()}
            textOption={textOption()}
            imgOption={imgOption()}
          />
        </Box>
        <HStack gap="$10">
          <For each={chooseImages()}>
            {(img, i) => (
              <Box
                borderWidth={4}
                borderColor={img.selected ? "$primary9" : "white"}
              >
                <Image
                  boxSize="100px"
                  src={img.src}
                  alt={img.name}
                  objectFit="cover"
                  onClick={() => {
                    setChooseImages((old) => {
                      const newChooseImages = old.map((img, idx) => {
                        if (idx === i()) {
                          return { ...img, selected: true };
                        } else {
                          return { ...img, selected: false };
                        }
                      });
                      return newChooseImages;
                    });
                  }}
                />
              </Box>
            )}
          </For>
        </HStack>
      </VStack>
      <Box w="700px" pt="$10">
        <VStack>
          <Control
            canvasSize={CANVAS_SIZE}
            setTextOption={setTextOption}
            setImgOption={setImgOption}
          />
          <Divider />
          <HStack pt="$4">
            <a href="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                class="bi bi-github"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
          </HStack>
        </VStack>
      </Box>
    </Flex>
  );
}
