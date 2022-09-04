import { useState } from "react";

import { useLoaderData } from "@remix-run/react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import CharacterAbilities from "~/components/characters/CharacterAbilities";
import CharacterClass from "~/components/characters/CharacterClass";
import CharacterDescription from "~/components/characters/CharacterDescription";
import CharacterEquipment from "~/components/characters/CharacterEquipment";
import CharacterNameRace from "~/components/characters/CharacterNameRace";
import CharacterReview from "~/components/characters/CharacterReview";

import { sorter } from "~/lib/common";
import dbConnect from "~/lib/dbConnect";

import AbilityScore from "~/models/ability_score";
import Background from "~/models/background";
import Class from "~/models/class";
import Equipment from "~/models/equipment";
import Language from "~/models/language";
import Race from "~/models/race";
import Skill from "~/models/skill";
import Subclass from "~/models/subclass";
import Subrace from "~/models/subrace";
import Trait from "~/models/trait";

export const meta = () => {
  return {
    title: "Dragon Scrolls: Create A Character",
  };
};

export const loader = async () => {
  await dbConnect();

  // Ability Score
  const acResults = await AbilityScore.find({});
  const abilityScores = sorter(acResults);

  // Backgrounds
  const bgResults = await Background.find({});
  const backgrounds = sorter(bgResults);

  // Classes
  const classResults = await Class.find({});
  const classes = sorter(classResults, "index");

  // Equipment
  const equipResults = await Equipment.find({});
  const equipment = sorter(equipResults);

  // Languages
  const languageResults = await Language.find({});
  const languages = sorter(languageResults);

  // Races
  const raceResults = await Race.find({});
  const races = sorter(raceResults);

  // Skills
  const skillResults = await Skill.find({});
  const skills = sorter(skillResults);

  // Subclasses
  const subclassResults = await Subclass.find({});
  const subclasses = sorter(subclassResults);

  // Subraces
  const subraceResults = await Subrace.find({});
  const subraces = sorter(subraceResults);

  // Traits
  const traitResults = await Trait.find({});
  const traits = sorter(traitResults);

  return {
    abilityScores,
    backgrounds,
    classes,
    equipment,
    languages,
    races,
    skills,
    subclasses,
    subraces,
    traits,
  };
};

const steps = [
  "Name & Race",
  "Class",
  "Abilities",
  "Description",
  "Equipment",
  "Review",
];

export default function NewCharacter() {
  const {
    abilityScores,
    backgrounds,
    classes,
    equipment,
    languages,
    races,
    skills,
    subclasses,
    subraces,
    traits,
  } = useLoaderData();

  const [activeStep, setActiveStep] = useState(0);
  const [character, setCharacter] = useState({});

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  console.log("character", character);

  return (
    <div className="m-5">
      <div className="hidden grow lg:block">
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((label) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel
                  StepIconProps={{ style: { color: "#EF4444" } }}
                  {...labelProps}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>

      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <div className="lg:m-5">
          <div className="flex h-full min-h-[400px] grow rounded bg-white p-5 lg:m-10">
            {activeStep === 0 && (
              <CharacterNameRace
                character={character}
                setCharacter={setCharacter}
                abilityScores={abilityScores}
                languages={languages}
                races={races}
                skills={skills}
                subraces={subraces}
                traits={traits}
              />
            )}
            {activeStep === 1 && (
              <CharacterClass
                character={character}
                setCharacter={setCharacter}
                classes={classes}
                subclasses={subclasses}
              />
            )}
            {activeStep === 2 && (
              <CharacterAbilities
                character={character}
                setCharacter={setCharacter}
              />
            )}
            {activeStep === 3 && (
              <CharacterDescription
                character={character}
                setCharacter={setCharacter}
                backgrounds={backgrounds}
                languages={languages}
              />
            )}
            {activeStep === 4 && (
              <CharacterEquipment
                character={character}
                setCharacter={setCharacter}
                equipment={equipment}
              />
            )}
            {activeStep === 5 && (
              <CharacterReview
                character={character}
                setCharacter={setCharacter}
              />
            )}
          </div>

          <div className="hidden grow lg:block">
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <button
                disabled={activeStep === 0}
                onClick={handleBack}
                className="mr-1 rounded py-2 px-4 hover:bg-gray-900/25 focus:bg-gray-900/25"
              >
                Back
              </button>
              <Box sx={{ flex: "1 1 auto" }} />

              <button
                className="rounded bg-red-500 py-2 px-4 text-white hover:bg-red-600 focus:bg-red-400"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </button>
            </Box>
          </div>
        </div>
      )}

      <div className="flex grow lg:hidden">
        <MobileStepper
          variant="progress"
          steps={6}
          position="static"
          activeStep={activeStep}
          sx={{ flexGrow: 1 }}
          nextButton={
            activeStep === 5 ? (
              <Button size="small" onClick={handleNext}>
                Finish
                <KeyboardArrowRight />
              </Button>
            ) : (
              <Button size="small" onClick={handleNext}>
                Next
                <KeyboardArrowRight />
              </Button>
            )
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      </div>
    </div>
  );
}