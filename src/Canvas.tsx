interface ICanvasProps {
  ref: any;
  w: number;
  h: number;
}

export default function Canvas(props: ICanvasProps) {
  return <canvas ref={props.ref} width={props.w} height={props.h} />;
}
