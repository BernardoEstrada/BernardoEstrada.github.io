import { useState } from "react";
import { resume, getEnrichedSkills } from "../../data/resume";
import type { SkillType, SkillSource, SkillDomain } from "../../types/resume";
import type { Section } from "./constants";
import { COMMANDS } from "./constants";
import { runCommand, getSuggestions } from "./commands";
import CommandSidebar from "./CommandSidebar";
import CommandDrawer from "./CommandDrawer";
import CommandsMenuButton from "./CommandsMenuButton";
import TerminalWindow from "./TerminalWindow";

export default function TerminalLayout() {
  const [log, setLog] = useState<{ command: string; section: Section }[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState<SkillType | "">("");
  const [sourceFilter, setSourceFilter] = useState<SkillSource | "">("");
  const [domainFilter, setDomainFilter] = useState<SkillDomain | "">("");
  const [cmd, setCmd] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const skills = getEnrichedSkills();
  const filteredSkills = skills.filter((s) => {
    if (typeFilter && s.type !== typeFilter) return false;
    if (sourceFilter && s.source !== sourceFilter) return false;
    if (domainFilter && s.domain !== domainFilter) return false;
    return true;
  });

  const handleRunCmd = () => {
    const line = cmd.trim();
    if (line) {
      setHistory((prev) => {
        const next = [...prev, line];
        if (prev[prev.length - 1] === line) return prev;
        return next.slice(-50);
      });
      setLog((prev) => [...prev, { command: line, section: runCommand(cmd) }].slice(-100));
    }
    setCmd("");
  };

  const suggestions = getSuggestions(cmd);

  const currentSection = log.length > 0 ? log[log.length - 1].section : null;

  const handleSelectSection = (s: Section) => {
    const entry = COMMANDS.find((c) => c.section === s);
    if (entry) setLog((prev) => [...prev, { command: entry.cmd, section: s }].slice(-100));
  };

  return (
    <div className="flex h-full min-h-0 bg-base-100 font-mono text-sm">
      <CommandSidebar section={currentSection} onSelect={handleSelectSection} />
      <CommandDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        section={currentSection}
        onSelect={handleSelectSection}
      />
      <CommandsMenuButton onClick={() => setMenuOpen(true)} />
      <TerminalWindow
        log={log}
        currentSection={currentSection}
        resume={resume}
        filteredSkills={filteredSkills}
        typeFilter={typeFilter}
        sourceFilter={sourceFilter}
        domainFilter={domainFilter}
        onTypeFilterChange={setTypeFilter}
        onSourceFilterChange={setSourceFilter}
        onDomainFilterChange={setDomainFilter}
        cmd={cmd}
        onCmdChange={setCmd}
        onRunCmd={handleRunCmd}
        suggestions={suggestions}
        history={history}
      />
    </div>
  );
}
