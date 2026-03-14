import { resume } from "@portfolios/data/resume";
import { ResponsiveCirclePacking } from "@nivo/circle-packing";
import { useMemo, useState } from "react";
import { Colors } from "@theme";
import { EnrichedSkill } from "@portfolios/types/resume";

const MAIN_GROUP = "Skills";

type dataObject = {
  id: string;
  value: number;
  shortName: string;
  group: string;
  children: Array<dataObject>;
};

const getShortName = (name: string, short?: string): string => {
  if (short) return short;
  const par = name.match(/\(([^)]+)\)/)?.[1];
  if (name.length > 5) return par || name.slice(0, 3) + "...";
  return name;
};

const cleanJSONData = (skill: Partial<Omit<EnrichedSkill, "source" | "domain" | "type">>): dataObject => ({
  id: skill.name ?? "",
  value: parseInt(skill.level ?? "1") || 1,
  shortName: getShortName(skill.name ?? "", skill.shortName),
  group: skill.group || "Other",
  children: [],
});

const groupDataObjects = (prev: Record<string, dataObject[]>, curr: dataObject) => {
  if (prev[curr.group]) prev[curr.group].push(curr);
  else prev[curr.group] = [curr];
  return prev;
};

const transformObjectToTree = ([key, value]: [string, dataObject[]]) => ({
  id: key,
  value: 0,
  group: MAIN_GROUP,
  shortName: MAIN_GROUP,
  children: value,
});

export default function BubbleChart({ themeColors }: { themeColors: Record<Colors, string> }) {
  const data = useMemo<dataObject>(() => {
    return {
      id: MAIN_GROUP,
      value: 0,
      group: MAIN_GROUP,
      shortName: MAIN_GROUP,
      children:
        Object.entries(resume.skills?.map(cleanJSONData).reduce(groupDataObjects, {}) || {}).map(
          transformObjectToTree,
        ) || [],
    };
  }, []);

  const categories = useMemo(() => {
    return data.children.map((d) => d.id);
  }, [data]);

  const [groupFilter, setGroupFilter] = useState<string>(MAIN_GROUP);

  const currentData = useMemo(() => {
    if (!groupFilter) return data;
    return data.children.find((d) => d.id == groupFilter) || data;
  }, [data, groupFilter]);

  const colors = [themeColors.n, themeColors.s, themeColors.p];

  return (
    <div className="h-96 w-full md:w-96">
      <div className="join join-vertical">
        <div className="join-item">
          <input
            type="radio"
            id={`graph-radio-${MAIN_GROUP}`}
            name="graph-group"
            className="radio radio-primary"
            value={MAIN_GROUP}
            checked={groupFilter === MAIN_GROUP}
            onChange={() => setGroupFilter(MAIN_GROUP)}
          />
          <label htmlFor={`graph-radio-${MAIN_GROUP}`}>All</label>
        </div>
        {categories.map((category, index) => (
          <div key={index} className="join-item">
            <input
              key={index}
              id={`graph-radio-${category}`}
              type="radio"
              name="graph-group"
              className="radio radio-primary"
              value={category}
              checked={groupFilter === category}
              onChange={() => setGroupFilter(category)}
            />
            <label className="inline-block align-middle" htmlFor={`graph-radio-${category}`}>
              {category}
            </label>
          </div>
        ))}
      </div>
      <ResponsiveCirclePacking
        data={currentData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        id="id"
        colors={colors.splice(groupFilter === MAIN_GROUP ? 0 : 1, colors.length)}
        colorBy="depth"
        padding={4}
        label={(d) => d.data.shortName}
        labelsFilter={(d) => d.node.depth === (groupFilter === MAIN_GROUP ? 2 : 1)}
        labelTextColor={themeColors.pc}
        enableLabels={true}
        valueFormat={(value) => value.toFixed(0)}
        onClick={(node) =>
          setGroupFilter((groupFilter === MAIN_GROUP ? node.path[node.path.length - 2] : undefined) || MAIN_GROUP)
        }
      />
    </div>
  );
}
