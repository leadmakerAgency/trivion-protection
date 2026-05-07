import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Building2,
  Car,
  ClipboardList,
  Clock,
  Factory,
  Flame,
  Landmark,
  MapPin,
  Package,
  Route,
  Shield,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  Users,
  Warehouse,
} from "lucide-react";

const scenarioFallback: LucideIcon[] = [Building2, Factory, ShieldCheck, Warehouse];

/** Two icons per service: matches typical two scenarios per program page */
const scenarioBySlug: Record<string, LucideIcon[]> = {
  "armed-security-guards": [ShieldAlert, Warehouse],
  "unarmed-security-guards": [UserCheck, Landmark],
  "marked-vehicle-patrol-security": [Car, Route],
  "fire-watch-security-guards": [Flame, ClipboardList],
  "construction-site-security-guards": [Factory, Landmark],
  "warehouse-security-guards": [Package, Warehouse],
};

export const getScenarioIcon = (slug: string, index: number): LucideIcon => {
  const list = scenarioBySlug[slug] ?? scenarioFallback;
  return list[index % list.length] ?? scenarioFallback[index % scenarioFallback.length];
};

const staffingPool: LucideIcon[] = [Shield, Clock, Route, Car, ClipboardList, Users];

export const getStaffingIcon = (index: number, label: string): LucideIcon => {
  const l = label.toLowerCase();
  if (l.includes("route") || l.includes("random") || l.includes("patrol")) return Route;
  if (l.includes("vehicle") || l.includes("marked")) return Car;
  if (l.includes("hybrid") || l.includes("+") || l.includes("split")) return Users;
  if (l.includes("night") || l.includes("shift") || l.includes("hour")) return Clock;
  if (l.includes("gate") || l.includes("dock") || l.includes("yard")) return Landmark;
  if (l.includes("fire") || l.includes("watch") || l.includes("impair")) return Flame;
  return staffingPool[index % staffingPool.length]!;
};

export type AreaLandingSectionKind = "local-focus" | "property-types" | "risks" | "planning";

const areaHeadingIcons: Record<AreaLandingSectionKind, LucideIcon> = {
  "local-focus": MapPin,
  "property-types": Building2,
  risks: AlertTriangle,
  planning: ClipboardList,
};

export const getAreaLandingSectionIcon = (kind: AreaLandingSectionKind): LucideIcon =>
  areaHeadingIcons[kind];

