export default function UnderConstruction({ title = null }) {
  return (
    <div>
      <h3 className={`m-3 text-4xl ${title === null ? 'hidden' : 'block'}`}>{title}</h3>
      <img
        className="mx-auto mb-3 w-full lg:w-1/2"
        src={`/images/landscape.png`}
        alt={`dnd party`}
      />

      <div className="h-full w-full p-3 text-center text-2xl">
        <p className="my-5">Uh oh! This page is still being conjured up!</p>
        <p>
          Please continue to explore other pages as we summon the rest of this
          area.
        </p>
      </div>
    </div>
  );
}
