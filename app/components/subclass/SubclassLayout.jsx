export default function SubclassLayout({ children = null, data }) {
  const { subclass, features } = data;
  const { name, index, desc } = subclass;

  return (
    <div className="mx-auto w-[80%] pb-10">
      <h3 className="mt-3	text-4xl font-bold capitalize">
        {subclass.subclass_flavor}: {name}
      </h3>
      <img
        className="mx-auto my-8 w-1/2"
        src={`/images/${subclass.class.index}-${index}.png`}
        alt={`${subclass.class.index}-${index} subclass`}
      />

      {/* Description */}
      {desc.map((item) => (
        <p key={item} className="font-bold">
          {item}
        </p>
      ))}

      {/* Children */}
      <div className="my-5">{children}</div>

      {/* Standard Features List */}
      <div id="subclass-features">
        {features &&
          features.map((feature) => (
            <div key={feature.index}>
              <h5 className="mt-3 text-2xl font-bold capitalize">
                {feature.name}
              </h5>
              {feature.desc.map((desc, idx) => (
                <p key={idx}>{desc}</p>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
