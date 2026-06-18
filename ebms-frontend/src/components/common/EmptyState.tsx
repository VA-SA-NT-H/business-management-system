interface Props {
  message: string;
}

const EmptyState = ({
  message
}: Props) => {

  return (

    <div
      className="
      text-center
      py-12"
    >

      <p className="text-slate-500">
        {message}
      </p>

    </div>

  );
};

export default EmptyState;