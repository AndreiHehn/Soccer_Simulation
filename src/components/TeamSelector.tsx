/* eslint-disable @typescript-eslint/no-explicit-any */
import Select, { components } from "react-select";
import type { Team } from "../lib/types";
import { useContext } from "react";
import { AppContext } from "../lib/context";
import { darken } from "polished";
import { useTranslation } from "react-i18next";

interface Props {
  selectedTournament: any;
  selectedTeam: string; // armazena o ID do time
  onSelectTeam: (teamId: string) => void;
  teams: Team[];
}

export function TeamSelector({ selectedTeam, onSelectTeam, teams }: Props) {
  const { selectedTournament } = useContext(AppContext);
  const { t } = useTranslation();

  const customSingleValue = ({ data }: any) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <img
        src={data.logo}
        alt={`${data.name} logo`}
        style={{ width: 30, height: 30 }}
      />
      <span style={{ color: selectedTournament?.textColor }}>{data.name}</span>
    </div>
  );

  const customOption = (props: any) => {
    const { data, innerRef, innerProps, isFocused } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          fontFamily: "Orbitron, Segoe UI, sans-serif",
          fontSize: "16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          width: "280px",
          padding: "6px 10px",
          cursor: "pointer",
          color: selectedTournament?.textColor,
          backgroundColor: isFocused
            ? darken(0.1, selectedTournament?.secondaryColor ?? "#ffffff")
            : selectedTournament?.secondaryColor ?? "#ffffff",
        }}
      >
        <img
          src={data.logo}
          alt={`${data.name} logo`}
          style={{ width: 30, height: 30 }}
        />
        <span>{data.name}</span>
      </div>
    );
  };

  const CustomClearIndicator = (props: any) => (
    <components.ClearIndicator {...props}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 20,
          height: 20,
          color: props.selectProps.textColor || "white",
          fontSize: "14px",
          cursor: "pointer",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        X
      </div>
    </components.ClearIndicator>
  );

  const CustomNoOptionsMessage = (props: any) => {
    return (
      <components.NoOptionsMessage {...props}>
        <div
          style={{
            fontFamily: "Orbitron, Segoe UI, sans-serif",
            fontSize: "14px",
            color: selectedTournament?.textColor,
            backgroundColor: selectedTournament?.secondaryColor,
            padding: "8px 0",
            textAlign: "center",
          }}
        >
          {t("No Teams Available")}
        </div>
      </components.NoOptionsMessage>
    );
  };

  const selectedOption = teams.find((team) => team.id === selectedTeam) || null;

  return (
    <Select
      options={teams}
      getOptionLabel={(team) => team.name}
      getOptionValue={(team) => team.id}
      value={selectedOption}
      onChange={(option) => onSelectTeam(option?.id ?? "")}
      components={{
        SingleValue: customSingleValue,
        Option: customOption,
        NoOptionsMessage: CustomNoOptionsMessage,
        DropdownIndicator: () => <div style={{ display: "none" }}></div>, // remove dropdown
        IndicatorSeparator: () => <div style={{ display: "none" }}></div>, // remove separator (vertical line)
        Placeholder: (props) => (
          <div
            {...props.innerProps}
            style={{
              color: selectedTournament?.textColor,
              fontFamily: "Orbitron, Segoe UI, sans-serif",
              fontSize: "14px",
              paddingLeft: "8px",
            }}
          >
            {props.children}
          </div>
        ),
        ClearIndicator: CustomClearIndicator,
      }}
      placeholder={t("Select a Team")}
      isSearchable={false}
      isClearable
      styles={{
        control: (base) => ({
          ...base,
          minHeight: "40px",
          height: "40px",
          fontSize: "16px",
          fontFamily: "Orbitron, Segoe-UI, sans-serif",
          borderRadius: "6px",
          borderColor: selectedTournament?.textColor,
          padding: "0 4px",
          width: "280px",
          backgroundColor: selectedTournament?.secondaryColor,
          boxShadow: "none",
          overflow: "hidden",
          "&:hover": {
            borderColor: "#2f3640",
          },
          "&:focus": {
            borderColor: selectedTournament?.secondaryColor,
          },
        }),
        menu: (base) => ({
          ...base,
          marginTop: "4px",
          borderRadius: "6px",
          backgroundColor: selectedTournament?.secondaryColor,
          overflow: "hidden",
        }),
        menuList: (base) => ({
          ...base,
          paddingTop: 0,
          paddingBottom: 0,
          backgroundColor: selectedTournament?.secondaryColor,
          overflowX: "hidden",
          maxHeight: "200px",

          // Scroll
          scrollbarWidth: "thin",
          scrollbarColor: `${selectedTournament?.backgroundColor} ${selectedTournament?.secondaryColor}`,

          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: selectedTournament?.secondaryColor,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: selectedTournament?.textColor,
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#888",
          },
        }),
        valueContainer: (base) => ({
          ...base,
          height: "40px",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }),
      }}
    />
  );
}
