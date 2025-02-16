import clsx from "clsx";
import Image from "next/image";

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  alt = "Product image",  // Add alt prop with a default value
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  alt?: string;  // Specify alt prop here
  label?: {
    title: string;
    amount: number;
    position?: "bottom" | "center";
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <>
      <div
        className={clsx(
          "group flex h-full w-full items-center justify-center overflow-hidden",
          {
            relative: label,
            "border-2 border-transparent": active,
            "border-transparent": !active,
          }
        )}
        style={{ aspectRatio: "2 / 3" }} // Set a fixed aspect ratio
      >
        {props.src ? (
          // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is inherited from `props`, which is being enforced with TypeScript
          <Image
            alt={alt}
            className={clsx("object-cover h-full w-full", {
              "transition duration-300 ease-in-out group-hover:scale-105":
                isInteractive,
            })}
            {...props}
          />
        ) : null}
      </div>
      <p className="text-white text-lg sm:text-xl lg:text-2xl font-bold pt-2 text-center">{label?.title}</p>
    </>
  );
}
