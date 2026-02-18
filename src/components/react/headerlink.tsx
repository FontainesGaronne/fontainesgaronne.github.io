import { cn } from "@/lib/utils";

export default function HeaderLink(
  props: React.ComponentProps<"a"> & { ["data-actif"]: boolean }
) {
  return (
    <a
      {...props}
      className={cn(
        "text-base inline-block tracking-wide transition duration-150 ease-out hover:opacity-100 p-2 md:p-4 lg:py-8",
        props["data-actif"] &&
          "border-b-3 border-yellow-300 text-yellow-700 font-medium	",
        props.className
      )}
    />
  );
}
