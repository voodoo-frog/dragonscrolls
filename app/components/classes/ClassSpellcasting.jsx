function ClassSpellCasting({ spellDetails, spellcasting }) {
  const { desc } = spellDetails;

  return (
    <div id="spellcasting">
      <h5 className="mt-3 text-xl font-bold capitalize">{spellDetails.name}</h5>
      {desc.map((desc, index) => (
        <p key={index}>{desc}</p>
      ))}
      {spellcasting.info.map((info) => (
        <div key={info.name}>
          <h5 className="mt-3 text-lg font-bold capitalize">{info.name}</h5>
          {info.desc.map((desc, index) => (
            <p key={index}>{desc}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
export default ClassSpellCasting;
