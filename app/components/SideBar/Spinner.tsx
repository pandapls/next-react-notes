
const Spinner = (props: { active: boolean }) => {
  const { active } = props;
  return (
    <div
      className={['spinner', active && 'spinner-active'].join(' ')}
      role="progressbar"
      aria-busy={active ? true : false}
    ></div>
  )
}

export default Spinner;