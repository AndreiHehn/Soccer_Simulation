/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from "react-select";

import EN_Flag from "../../src/assets/icons/usaFlag.png";
import PT_Flag from "../../src/assets/icons/brazilFlag.png";
import ES_Flag from "../../src/assets/icons/spainFlag.png";

interface Props {
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
}

const languages = [
  {
    value: "en",
    label: "English",
    flag: EN_Flag,
  },
  {
    value: "es",
    label: "Español",
    flag: ES_Flag,
  },
  {
    value: "pt",
    label: "Português",
    flag: PT_Flag,
  },
];

export function LanguageSelector({
  selectedLanguage,
  onSelectLanguage,
}: Props) {
  const customSingleValue = ({ data }: any) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <img
        src={data.flag}
        alt={`${data.label} flag`}
        style={{ width: 20, height: 20 }}
      />
      <span style={{ color: "var(--text-primary)" }}>{data.label}</span>
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
          width: "200px",
          padding: "10px",
          cursor: "pointer",

          color: "var(--text-primary)",
          backgroundColor: isFocused
            ? "var(--app-secondary)"
            : "var(--app-tertiary)",
        }}
      >
        <img
          src={data.flag}
          alt={`${data.label} flag`}
          style={{ width: 20, height: 20 }}
        />
        <span>{data.label}</span>
      </div>
    );
  };

  return (
    <Select
      options={languages}
      value={languages.find((lang) => lang.value === selectedLanguage)}
      onChange={(option) => onSelectLanguage(option?.value ?? "en")}
      components={{
        SingleValue: customSingleValue,
        Option: customOption,
      }}
      isSearchable={false}
      styles={{
        control: (base) => ({
          ...base,
          minHeight: "32px",
          height: "32px",
          fontSize: "16px",
          fontFamily: "Orbitron, Segoe-UI, sans-serif",
          borderRadius: "6px",
          borderColor: "var(--app-secondary)",
          padding: "0 4px",
          width: "200px",
          backgroundColor: "var(--app-tertiary)",
          boxShadow: "none",

          "&:hover": {
            borderColor: "#2f3640",
          },

          "&:focus": {
            borderColor: "var(--app-secondary)",
          },
        }),
        valueContainer: (base) => ({
          ...base,
          padding: "0 4px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          color: "#2f3640",
        }),
        indicatorsContainer: (base) => ({
          ...base,
          height: "32px",
        }),
        indicatorSeparator: (base) => ({
          ...base,
          display: "none",
        }),
        dropdownIndicator: (base) => ({
          ...base,
          padding: "2px",
          color: "var(--text-primary)",
        }),
        input: (base) => ({
          ...base,
          margin: 0,
          padding: 0,
        }),
        singleValue: (base) => ({
          ...base,
          lineHeight: "32px",
          display: "flex",
          alignItems: "center",
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: "var(--background-primary)",
          borderRadius: "6px",
          overflow: "hidden",
          marginTop: "2px",
          width: "200px",
        }),

        menuList: (base) => ({
          ...base,
          padding: 0,
          backgroundColor: "var(--background-primary)",
        }),
      }}
    />
  );
}
