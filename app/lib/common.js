import { Link } from "@remix-run/react";

import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export const sorter = (arr, category = "name", numeric = false) => {
  return arr.sort((a, b) => {
    const nameA = a[category].toString().toUpperCase();
    const nameB = b[category].toString().toUpperCase();
    return nameA.localeCompare(nameB, undefined, { numeric });
  });
};

export const createSet = (arr) => {
  const setOfNames = new Set();
  const res = [];
  arr.forEach((item) => {
    setOfNames.add(item.name);
  });

  setOfNames.forEach((name) => {
    res.push(arr.find((item) => item.name === name));
  });

  return [...new Map(res.map((item) => [item.name, item])).values()];
};

export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const capitalize = (val) => {
  if (val instanceof String) {
    return val.charAt(0).toUpperCase() + val.substring(1);
  } else {
    return val;
  }
};

export const currencyConverter = (qty, from, to) => {
  const rates = {
    cp: 20,
    sp: 2,
    ep: 1,
    gp: 0.2,
    pp: 0.02,
  };
  const fromRate = rates[from];
  const toRate = rates[to];
  return Math.round(qty * (toRate / fromRate) * 100) / 100;
};

export const goldConverter = (qty, from) => {
  return currencyConverter(qty, from, "gp");
};

export const feature = (features, title, idx) => (
  <>
    <h5 className="mt-3 text-2xl font-bold capitalize">{title}</h5>
    <>
      {features
        .find((feature) => feature.index === idx)
        .desc.map((desc, index) => (
          <p key={index}>{desc}</p>
        ))}
    </>
  </>
);

export const list = (features, title, idx, fullDesc = true) => (
  <>
    <h5 className="mt-3 text-2xl font-bold capitalize">{title}</h5>

    {fullDesc ? (
      features
        .find((feature) => feature.index === idx)
        .desc.map((desc, index) => <p key={index}>{desc}</p>)
    ) : (
      <p>{features.find((feature) => feature.index === idx).desc[0]}</p>
    )}

    <ul className="list-inside list-disc">
      {features
        .filter((feature) => feature.parent && feature.parent.index === idx)
        .sort((a, b) => {
          const nameA = a.index.toString().toUpperCase();
          const nameB = b.index.toString().toUpperCase();
          return nameA.localeCompare(nameB);
        })
        .map((feature) => (
          <li key={feature.index}>
            <span className="font-bold">{feature.name}:</span>{" "}
            {feature.desc.map((desc, index) => (
              <span key={index}>{desc}</span>
            ))}
          </li>
        ))}
    </ul>
  </>
);

export const subclassList = (list) => (
  <ul>
    {list.map((subclass) => (
      <div key={subclass.index}>
        <div className="w-50 m-5 flex divide-black font-bold">
          <Link to={subclass.index} className="text-lg">
            {subclass.name} ({subclass.source_book})
          </Link>
        </div>
      </div>
    ))}
  </ul>
);

export const table = (title, headers, rows, small = false) => (
  <TableContainer
    className="my-3"
    component={Paper}
    sx={{ backgroundColor: "rgb(17 24 39 / 0.25)", border: "1px solid white" }}
  >
    {title && (
      <>
        <h5 className="m-3 text-lg font-bold capitalize">{title}</h5>
        <hr />
      </>
    )}
    <Table aria-label="table" size={small ? "small" : "medium"}>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableCell key={header}>
              <strong>{header}</strong>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, idx) => (
          <TableRow
            key={idx}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            {row.map((cell, idx) => (
              <TableCell
                key={idx}
                sx={{
                  "&:first-letter": {
                    textTransform: "capitalize",
                  },
                }}
              >
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export const select = (label, name, value, options, onChange) => {
  let title = "Choose a";

  const vowels = ["a", "e", "i", "o", "u"];

  if (vowels.includes(label.charAt(0).toLowerCase())) {
    title = "Choose an";
  }

  title += ` ${label}`;

  return (
    <div className="mt-3 flex w-full justify-start">
      <div className="mb-3 w-full">
        <select
          className="
          form-select m-0
          block
          w-full
          appearance-none
          truncate
          rounded
          border
          border-solid
          border-gray-300
          bg-white
          bg-clip-padding bg-no-repeat px-3
          py-1.5 pr-8 text-base
          font-normal
          capitalize
          text-gray-700
          transition
          ease-in-out
          focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none
        "
          aria-label={`${name} select`}
          name={name}
          value={value}
          onChange={onChange}
        >
          <option value="">{title}</option>
          {options.map((opt) => (
            <option key={opt.index || opt} value={opt.index || opt}>
              {opt.name || opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const pagination = (array, page, onChange) => (
  <div className="flex justify-center py-5">
    <Pagination
      sx={{
        "& .MuiPaginationItem-root.Mui-selected": {
          backgroundColor: "#EF4444",
          color: "white",
        },
      }}
      count={Math.ceil(array.length / 10)}
      page={page}
      onChange={onChange}
    />
  </div>
);

export const classFeatures = (features, mainClass) => {
  let classFeatures = features.filter(
    (feature) => feature.class.index === mainClass && !feature.subclass
  );

  classFeatures = createSet(sorter(classFeatures, "level", true));

  return classFeatures;
};

export const subclassFeatures = (features, subclass) => {
  let classFeatures = features.filter(
    (feature) => feature.subclass && feature.subclass.index === subclass
  );

  classFeatures = createSet(sorter(classFeatures, "level", true));

  return classFeatures;
};

export const alphabetizeNum = (number) => {
  const num = number.toString();
  let numLength = num.length;
  let word = "";

  if (numLength === 0 || numLength > 4) {
    return;
  }

  const single_digits = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  const two_digits = [
    "",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];

  const tens_multiple = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  const tens_power = ["hundred", "thousand"];

  if (numLength == 1) {
    return single_digits[num.charCodeAt(0) - 48];
  }

  let x = 0;
  while (x < num.length) {
    // Code path for first 2 digits
    if (numLength >= 3) {
      if (num.charCodeAt(x) - 48 !== 0) {
        word += `${single_digits[num.charCodeAt(x) - 48]} ${
          tens_power[numLength - 3]
        } `;
      }
      numLength -= 1;
    } else {
      // 10 - 19
      if (num.charCodeAt(x) - 48 === 1) {
        let sum = num.charCodeAt(x) - 48 + num.charCodeAt(x + 1) - 48;
        word += `${two_digits[sum]}`;
        return word;
      }

      // 20
      else if (
        num.charCodeAt(x) - 48 === 2 &&
        num.charCodeAt(x + 1) - 48 === 0
      ) {
        word = "twenty";
        return word;
      }

      // 21 - 99
      else {
        let i = num.charCodeAt(x) - 48;
        if (i > 0) {
          word += `${tens_multiple[i]} `;
        } else {
          word += "";
        }
        let j = num.charCodeAt(x + 1) - 48;
        if (j > 0) {
          return (word += `${single_digits[j]}`);
        }
        return word;
      }
    }
    x += 1;
  }
};

export const tabs = (tabs, activeTab, onChange) => {
  return (
    <ul className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tab"
        role="tablist">
      {tabs.map((tab, idx) => (
        <li key={idx} className="nav-item" role="presentation">
        <button className={`
          nav-link
          block
          font-medium
          text-xs
          leading-tight
          uppercase
          border-x-0 border-t-0 border-b-2 border-transparent
          px-6
          py-3
          my-2
          hover:border-transparent hover:bg-gray-100
          focus:border-transparent
          ${activeTab === tab && 'active'}
        `}
        id={`${tab}-tab`}
        data-bs-toggle="pill"
        data-bs-target={`#${tab}`}
        role={`tab`}
        aria-controls={`${tab}`}
        aria-selected="true"
        value={tab}
        onClick={onChange}
        >
          {tab}
        </button>
      </li>
      ))}
      </ul>
  )
}

export const Accordion = ({title, expanded, onClick, small = false, children}) => (
  <div className="accordion" id={`${title}-accordion`}>
    <div className="accordion-item bg-white border border-gray-200">
      <h2 className="accordion-header mb-0" id={`#${title}-heading`}>
        <button value={title} onClick={onClick} className={`accordion-button
          ${!expanded && 'collapsed'}
          relative
          flex
          items-center
          w-full
          ${small ? 'py-2' : 'py-4'}
          px-5
          text-base text-gray-800 text-left
          bg-white
          border-0
          rounded-none
          transition
          focus:outline-none`}
            type="button"
        data-bs-toggle="collapse"
        data-bs-target={`#${title}-collapse`}
        aria-expanded={expanded && title}
        aria-controls={`${title}-collapse`}>
          {title}
        </button>
      </h2>
      <div id={`${title}-collapse`} className={`accordion-collapse collapse ${expanded && 'show'}`} aria-labelledby={`#${title}-heading`}
        data-bs-parent={`${title}-accordion`}>
        <div className="accordion-body py-4 px-5">
          {children}
          </div>
      </div>
    </div>
  </div>
)

export const AccordionItem = ({title, expanded, onClick, small = false, children}) => (
  <div className="accordion-item bg-white border border-gray-200">
  <h2 className="accordion-header mb-0" id={`#${title}-heading`}>
      <button value={title} onClick={onClick} className={`accordion-button
        ${!expanded && 'collapsed'}
      relative
      flex
      items-center
      w-full
      ${small ? 'py-2' : 'py-4'}
      px-5
      text-base text-gray-800 text-left
      bg-white
      border-0
      rounded-none
      transition
      focus:outline-none`}
      type="button"
      data-bs-toggle="collapse"
      data-bs-target={`#${title}-collapse`}
      aria-expanded={expanded && title}
      aria-controls={`${title}-collapse`}>
        {title}
      </button>
    </h2>
    <div id={`${title}-collapse`} className={`accordion-collapse collapse ${expanded && 'show'}`} aria-labelledby={`#${title}-heading`}
      data-bs-parent={`${title}-accordion`}>
      <div className="accordion-body py-4 px-5">
        {children}
        </div>
    </div>
  </div>
)