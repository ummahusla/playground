interface SeeMoreCollapsedProps {
  toggleMore: (value: boolean) => void;
}

const SeeMoreCollapsed = ({ toggleMore }: SeeMoreCollapsedProps) => {
  return (
    <p
      style={{
        textAlign: 'center',
        fontSize: 14,
        bottom: 20,
        position: 'relative',
      }}
      onClick={() => toggleMore(true)}
    >
      A custom See More message →
    </p>
  );
};

export default SeeMoreCollapsed;
