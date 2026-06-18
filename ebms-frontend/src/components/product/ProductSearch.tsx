interface Props {
  value: string;
  onChange: (
    value: string
  ) => void;
}

const ProductSearch = ({
  value,
  onChange
}: Props) => {

  return (
    <input
      type="text"
      value={value}
      onChange={(e) =>
        onChange(
          e.target.value
        )
      }
      placeholder="Search products..."
      className="
        border
        rounded-lg
        px-4
        py-2
        w-80
      "
    />
  );
};

export default ProductSearch;