import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { PlugsConnected as PlugsConnectedIcon } from '@phosphor-icons/react/dist/ssr/PlugsConnected';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare';
import { Folder as FolderIcon } from '@phosphor-icons/react/dist/ssr/Folder';
import { Cpu as CpuIcon } from '@phosphor-icons/react/dist/ssr/Cpu';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { Network as NetworkIcon } from '@phosphor-icons/react/dist/ssr/Network';
import { Globe as GlobeIcon } from '@phosphor-icons/react/dist/ssr/Globe';
import { Repeat as RepeatIcon } from '@phosphor-icons/react/dist/ssr/Repeat';
import { Monitor as MonitorIcon } from '@phosphor-icons/react/dist/ssr/Monitor';
import { Lock as LockIcon } from '@phosphor-icons/react/dist/ssr/Lock';
import { Database as DatabaseIcon } from '@phosphor-icons/react/dist/ssr/Database';
import { Circuitry as CircuitryIcon } from '@phosphor-icons/react/dist/ssr/Circuitry';
import { ComputerTower as ComputerTowerIcon } from '@phosphor-icons/react/dist/ssr/ComputerTower';
import { Archive as ArchiveIcon } from '@phosphor-icons/react/dist/ssr/Archive';
import {WifiHigh as WiFiHighIcon} from '@phosphor-icons/react/dist/ssr/WifiHigh'


export const navIcons = {
  'chart-pie': ChartPieIcon,
  'gear-six': GearSixIcon,
  'plugs-connected': PlugsConnectedIcon,
  'lora': WiFiHighIcon,
  'x-square': XSquare,
  'folder': FolderIcon,
  'cpu': CpuIcon,
  'magnifying-glass' : MagnifyingGlassIcon,
  'network' : NetworkIcon,
  'globe' : GlobeIcon,
  'monitor': MonitorIcon,
  'repeat' : RepeatIcon,
  'database' : DatabaseIcon,
  'circuit' : CircuitryIcon,
  'archive' : ArchiveIcon,
  'computer' : ComputerTowerIcon,
  'lock' : LockIcon,
  user: UserIcon,
  users: UsersIcon,
} as Record<string, Icon>;
