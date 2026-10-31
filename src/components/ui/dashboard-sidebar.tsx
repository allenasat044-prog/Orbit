import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export type NavItemData = {
  id: string;
  title: string;
  icon: React.ElementType;
  badge?: number | string;
  shortcut?: string;
  /** Shown softer when its action is not ready yet; it can still be clicked. */
  dim?: boolean;
  /** Overrides the "selected" highlight. */
  active?: boolean;
  defaultOpen?: boolean;
  children?: NavItemData[];
};

export type NavGroupData = {
  heading?: string;
  items: NavItemData[];
};

export type WorkspaceOption = { id: string; label: string };

export type WorkspaceSwitcherProps = {
  title: string;
  subtitle?: string;
  options: WorkspaceOption[];
  emptyText?: string;
  onOpen?: () => void;
  onPick?: (id: string) => void;
  action?: { label: string; onClick: () => void };
};

function WorkspaceSwitcher({ title, subtitle, options, emptyText, onOpen, onPick, action }: WorkspaceSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    if (!isOpen) onOpen?.();
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div
        onClick={toggle}
        className="flex items-center justify-between px-2 py-2 mb-4 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors select-none group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[6px] bg-primary text-primary-foreground flex items-center justify-center font-semibold text-[13px] shadow-sm">
            {title.charAt(0)}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-[13px] font-medium leading-none mb-1 text-foreground truncate max-w-[120px]">{title}</span>
            {subtitle && <span className="text-[11px] text-muted-foreground leading-none truncate max-w-[120px]">{subtitle}</span>}
          </div>
        </div>
        <ChevronDown className="w-4 h-4 text-muted-foreground/50 group-hover:text-foreground/70 transition-colors shrink-0" strokeWidth={1.5} />
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-[52px] left-0 w-full bg-card border border-border/50 rounded-lg shadow-xl z-50 py-1 flex flex-col gap-0.5 animate-in fade-in zoom-in-95 duration-100">
            {options.length === 0 && <div className="px-3 py-2 mx-1 text-[12px] text-muted-foreground">{emptyText ?? "Nothing here yet"}</div>}
            {options.map((o) => (
              <div
                key={o.id}
                onClick={() => {
                  onPick?.(o.id);
                  setIsOpen(false);
                }}
                className="px-3 py-2 mx-1 text-[13px] rounded-md cursor-pointer transition-colors truncate text-foreground/80 hover:bg-black/5 dark:hover:bg-white/5"
              >
                {o.label}
              </div>
            ))}
            {action && (
              <>
                <div className="h-px bg-border/50 my-1 mx-2" />
                <div
                  onClick={() => {
                    action.onClick();
                    setIsOpen(false);
                  }}
                  className="px-3 py-2 mx-1 text-[13px] text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-md cursor-pointer flex items-center gap-2 transition-colors"
                >
                  <span className="text-[16px] leading-none mb-0.5">+</span> {action.label}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function NavItem({
  item,
  activeId,
  onSelect,
  level = 0,
}: {
  item: NavItemData;
  activeId?: string;
  onSelect: (id: string) => void;
  level?: number;
}) {
  const isActive = item.active ?? activeId === item.id;
  const hasChildren = !!item.children;
  const [isOpen, setIsOpen] = useState(!!item.defaultOpen);

  const handleClick = () => {
    if (hasChildren) setIsOpen(!isOpen);
    else onSelect(item.id);
  };

  return (
    <div className="flex flex-col w-full">
      <div
        role="button"
        tabIndex={0}
        aria-expanded={hasChildren ? isOpen : undefined}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), handleClick())}
        className={`group flex items-center justify-between px-2.5 py-[7px] rounded-[6px] cursor-pointer transition-all duration-200 select-none outline-none focus-visible:ring-1 focus-visible:ring-primary/50
          ${isActive ? "bg-black/5 dark:bg-white/10 text-foreground font-medium" : "text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground/90"}
          ${item.dim ? "opacity-60" : ""}
        `}
        style={{ paddingLeft: `${level * 12 + 10}px` }}
        onClick={handleClick}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <item.icon
            className={`w-[16px] h-[16px] shrink-0 transition-colors ${isActive ? "text-foreground" : "text-muted-foreground/70 group-hover:text-foreground/70"}`}
            strokeWidth={1.5}
          />
          <span className="text-[13px] tracking-wide truncate">{item.title}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {item.shortcut && (
            <kbd className="hidden group-hover:inline-flex items-center justify-center h-5 px-1.5 text-[10px] font-medium font-mono text-muted-foreground/60 bg-background/50 border border-border/50 rounded-[4px] shadow-xs">
              {item.shortcut}
            </kbd>
          )}
          {item.badge !== undefined && item.badge !== "" && (
            <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-medium rounded-full bg-primary/10 text-primary">{item.badge}</span>
          )}
          {hasChildren && <ChevronRight className={`w-3.5 h-3.5 text-muted-foreground/50 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} strokeWidth={2} />}
        </div>
      </div>

      {hasChildren && (
        <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden min-h-0 relative flex flex-col gap-0.5 mt-0.5">
            <div className="absolute top-0 bottom-0 border-l border-black/5 dark:border-white/5" style={{ left: `${level * 12 + 17.5}px` }} />
            {item.children!.map((child) => (
              <NavItem key={child.id} item={child} activeId={activeId} onSelect={onSelect} level={level + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function SidebarNav({
  className = "",
  groups,
  bottomItems = [],
  activeId,
  onSelect,
  workspace,
}: {
  className?: string;
  groups: NavGroupData[];
  bottomItems?: NavItemData[];
  activeId?: string;
  onSelect: (id: string) => void;
  workspace: WorkspaceSwitcherProps;
}) {
  return (
    <div className={`flex flex-col w-[260px] h-full bg-card/50 border-r border-border/50 p-3 font-sans ${className}`}>
      <WorkspaceSwitcher {...workspace} />

      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col gap-4 mt-2">
        {groups.map((group, idx) => (
          <div key={idx} className="flex flex-col gap-0.5">
            {group.heading && <span className="px-2.5 mb-1 text-[11px] font-semibold tracking-wider text-muted-foreground/50 uppercase">{group.heading}</span>}
            {group.items.map((item) => (
              <NavItem key={item.id} item={item} activeId={activeId} onSelect={onSelect} />
            ))}
          </div>
        ))}
      </div>

      {bottomItems.length > 0 && (
        <div className="mt-auto pt-4 border-t border-border/50 flex flex-col gap-0.5">
          {bottomItems.map((item) => (
            <NavItem key={item.id} item={item} activeId={activeId} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SidebarNav;
