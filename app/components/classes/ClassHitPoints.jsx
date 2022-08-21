function ClassHitPoints({ index, hit_die }) {
  return (
    <div id="hit-points">
      <h5 className="mt-3 text-xl font-bold capitalize">Hit Points</h5>
      <p>
        <strong>Hit points Hit Dice:</strong> 1d{hit_die} per {index} level
      </p>
      <p>
        <strong>Hit points at 1st Level:</strong> {hit_die} + your Constitution
        modifier
      </p>
      <p>
        <strong>Hit points at Higher Levels:</strong> 1d{hit_die} (or{" "}
        {hit_die / 2 + 1}) + your Constitution modifier per {index} level after
        1st
      </p>
    </div>
  );
}
export default ClassHitPoints;
