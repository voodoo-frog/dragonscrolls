import { Link } from "@remix-run/react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";

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

export const list = (features, title, idx, sliceNum = 16, fullDesc = true) => (
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
            <span className="font-bold">{feature.name.slice(sliceNum)}:</span>{" "}
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
    <Table
      aria-label="table"
      size={small ? "small" : "medium"}
    >
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
