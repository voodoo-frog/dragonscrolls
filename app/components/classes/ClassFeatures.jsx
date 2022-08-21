import { Link } from "@remix-run/react";

function ClassFeatures({ classFeatures, subclasses }) {
  return (
    <div>
      {classFeatures.map((feature) => {
        if (feature.subclass || feature.name === "Spellcasting") return;
        return (
          <div key={feature.index}>
            <h5 className="mt-3 text-xl font-bold capitalize">
              {feature.name}
            </h5>
            {feature.desc.map((desc, index) => (
              <p key={index}>{desc}</p>
            ))}
            {feature.category === "subclass" && (
              <ul>
                {subclasses.map((subclass) => (
                  <div key={subclass.index}>
                    <div className="w-50 m-5 flex divide-black font-bold">
                      <Link to={subclass.index} className="text-lg">
                        {subclass.name} ({subclass.source_book})
                      </Link>
                    </div>
                  </div>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
export default ClassFeatures;
