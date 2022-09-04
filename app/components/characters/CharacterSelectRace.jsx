import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";

import CharacterCard from "./CharacterCard";

export default function CharacterSelectRace({
  changeRace,
  races,
  subraces,
  modalOpen,
  setModalOpen,
  selectedRace,
  handleSelectRace,
  selectedSubrace,
  handleSubraceSelection,
  traits,
  displaySubrace,
  handleSelection,
}) {
  return (
    <>
      <h6 className="my-5 text-2xl">
        {changeRace ? "Select New Race" : "Choose a Race"}:
      </h6>
      <div className="flex justify-center">
        <div className="rounded-lg border border-gray-200 bg-white text-gray-900">
          <Dialog
            scroll={"paper"}
            onClose={() => setModalOpen(false)}
            open={modalOpen}
          >
            <DialogTitle
              id="scroll-dialog-title"
              className="flex items-center justify-between"
            >
              <p>Choose A Race</p>
              <IconButton
                aria-label="close"
                onClick={() => setModalOpen(false)}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers={true}>
              <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                <CharacterCard
                  race={selectedRace}
                  subrace={selectedSubrace}
                  traits={traits}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <button
                className="rounded bg-red-500 py-2 px-4 text-white hover:bg-red-600 focus:bg-red-400"
                onClick={handleSelectRace}
              >
                Choose Race
              </button>
              <button
                className="rounded bg-gray-300 py-2 px-4 hover:bg-gray-400 focus:bg-gray-200"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </DialogActions>
          </Dialog>
          {races.map((race) => (
            <>
              {race.subraces.length ? (
                <>
                  <button
                    key={race.index}
                    type="button"
                    className="
                      w-full
                      cursor-pointer
                      border-b
                      border-gray-200 px-4
                      py-2
                      text-left transition
                      duration-500 hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-200
                      focus:text-gray-600
                      focus:outline-none
                      focus:ring-0
                    "
                    onClick={() => handleSubraceSelection(race.index)}
                  >
                    <div className="align-center flex justify-start">
                      <img
                        className="h-[50px] w-[50px] rounded-full"
                        name={race.name}
                        src={`/images/${race.index}-avatar.jpeg`}
                        alt={`${race.name} Avatar`}
                      />
                      <p className="ml-3 self-center text-center text-lg">
                        {race.name}
                      </p>
                      {displaySubrace && displaySubrace === race.index ? (
                        <KeyboardDoubleArrowUpIcon
                          className="ml-auto"
                          sx={{ fontSize: "50px" }}
                        />
                      ) : (
                        <KeyboardDoubleArrowDownIcon
                          className="ml-auto"
                          sx={{ fontSize: "50px" }}
                        />
                      )}
                    </div>
                  </button>
                  {displaySubrace &&
                    displaySubrace === race.index &&
                    subraces
                      .filter(
                        (subrace) => subrace.race.index === displaySubrace
                      )
                      .map((subrace) => (
                        <button
                          key={subrace.index}
                          type="button"
                          className="
                            w-full
                            cursor-pointer
                            border-b
                            border-gray-200 px-4
                            py-2
                            text-left transition
                            duration-500 hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-200
                            focus:text-gray-600
                            focus:outline-none
                            focus:ring-0
                          "
                          onClick={() => handleSelection(race, subrace)}
                        >
                          <div className="align-center ml-5 flex justify-start">
                            <img
                              className="h-[50px] w-[50px] rounded-full"
                              name={subrace.name}
                              src={`/images/${subrace.index}-avatar.jpeg`}
                              alt={`${subrace.name} Avatar`}
                            />
                            <p className="ml-3 self-center text-center text-lg">
                              {subrace.name}
                            </p>
                            <ChevronRightIcon
                              className="ml-auto"
                              sx={{ fontSize: "50px" }}
                            />
                          </div>
                        </button>
                      ))}
                </>
              ) : (
                <button
                  key={race.index}
                  type="button"
                  className="
                    w-full
                    cursor-pointer
                    border-b
                    border-gray-200 px-4
                    py-2
                    text-left transition
                    duration-500 hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-200
                    focus:text-gray-600
                    focus:outline-none
                    focus:ring-0
                  "
                  onClick={() => handleSelection(race)}
                >
                  <div className="align-center flex justify-start">
                    <img
                      className="h-[50px] w-[50px] rounded-full"
                      name={race.name}
                      src={`/images/${race.index}-avatar.jpeg`}
                      alt={`${race.name} Avatar`}
                    />
                    <p className="ml-3 self-center text-center text-lg">
                      {race.name}
                    </p>
                    <ChevronRightIcon
                      className="ml-auto"
                      sx={{ fontSize: "50px" }}
                    />
                  </div>
                </button>
              )}
            </>
          ))}
        </div>
      </div>
    </>
  );
}
