import { Spinner } from "../ui/spinner";

const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner className="size-10" />
    </div>
  );
};

export default Loader;
