import { Contract, ContractStatus } from '../types';

/**
 * 判定合約狀態邏輯 (Contract Status Logic)
 * 1. 🟢 生效中 (Valid): 當下日期介於合約起訖日之間
 * 2. 🟡 即將到期 (Expiring): 當下日期距離到期日 90 天內
 * 3. ⚫ 已到期 (Expired): 當下日期 > 合約到期日
 * 4. 🔴 提前終止 (Terminated): 人工手動標記
 */
export const calculateContractStatus = (contract: Contract, systemDateStr: string): ContractStatus => {
  // 提前終止 (Terminated) > 【人工手動】
  if (contract.status === ContractStatus.TERMINATED) {
    return ContractStatus.TERMINATED;
  }

  const today = new Date(systemDateStr);
  const start = new Date(contract.startDate);
  const end = new Date(contract.endDate);

  // 已到期 (Expired)
  if (today > end) {
    return ContractStatus.EXPIRED;
  }

  // 即將到期 (Expiring)
  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 90 && diffDays >= 0) {
    return ContractStatus.EXPIRING;
  }

  // 生效中 (Valid)
  return ContractStatus.VALID;
};

export const getStatusColor = (status: ContractStatus) => {
  switch (status) {
    case ContractStatus.VALID: return 'bg-[#1DD793]/10 text-[#1DD793]';
    case ContractStatus.EXPIRING: return 'bg-red-50 text-red-600';
    case ContractStatus.EXPIRED: return 'bg-gray-100 text-gray-500';
    case ContractStatus.TERMINATED: return 'bg-orange-50 text-orange-600';
    default: return 'bg-gray-100 text-gray-500';
  }
};

export const getStatusDotColor = (status: ContractStatus) => {
  switch (status) {
    case ContractStatus.VALID: return 'bg-[#1DD793]';
    case ContractStatus.EXPIRING: return 'bg-red-500';
    case ContractStatus.EXPIRED: return 'bg-gray-400';
    case ContractStatus.TERMINATED: return 'bg-orange-500';
    default: return 'bg-gray-300';
  }
};

/**
 * 格式化電量單位 (kWh -> MWh)
 * 當數值超過 1,000 時自動進位
 */
export const formatEnergy = (kwh: number, precision: number = 1): string => {
  const absKwh = Math.abs(kwh);
  if (absKwh >= 1000000) {
    return `${(kwh / 1000000).toLocaleString(undefined, { minimumFractionDigits: precision, maximumFractionDigits: precision })} GWh`;
  }
  if (absKwh >= 1000) {
    return `${(kwh / 1000).toLocaleString(undefined, { minimumFractionDigits: precision, maximumFractionDigits: precision })} MWh`;
  }
  return `${kwh.toLocaleString()} kWh`;
};

/**
 * 格式化功率單位 (kW -> MW)
 * 當數值超過 1,000 時自動進位
 */
export const formatPower = (kw: number, precision: number = 1): string => {
  const absKw = Math.abs(kw);
  if (absKw >= 1000) {
    return `${(kw / 1000).toLocaleString(undefined, { minimumFractionDigits: precision, maximumFractionDigits: precision })} MW`;
  }
  return `${kw.toLocaleString()} kW`;
};

/**
 * 動態翻譯合約、企業與門市名稱 (Bilingual translation for contracts and clients)
 */
export const translateName = (name: string, language: 'zh' | 'en'): string => {
  if (language === 'zh' || !name) return name;

  const map: Record<string, string> = {
    // Clients & Companies
    '屏東大武太陽能案場': 'Pingtung Dawu Solar Farm',
    '苗栗通霄風力發電廠': 'Miaoli Tongxiao Wind Farm',
    '連鎖便利商店': 'Chain Convenience Store',
    '知名連鎖家居商': 'Famous Chain Home Furnishing Brand',

    // Contracts
    '屏東大武太陽能案場 購電合約': 'Pingtung Dawu Solar Farm Purchase Agreement',
    '苗栗通霄風力發電廠 購電合約': 'Miaoli Tongxiao Wind Farm Purchase Agreement',
    '連鎖便利商店 售電合約': 'Chain Convenience Store Sales Contract',
    '知名連鎖家居商 綠電採購合約': 'Famous Chain Home Furnishing Brand Green Power Purchase Agreement',
    '連鎖 2026 綠電增購合約': 'Chain Store 2026 Green Power Expansion Contract',
    '連鎖 2024 舊案續約合約': 'Chain Store 2024 Renewal Contract',
    '連鎖 2023 歷史測試案': 'Chain Store 2023 Historical Test Case',
    '宜家 2024 提前終止模擬案': 'IKEA 2024 Early Termination Simulation Case',

    // Feeders / Meters
    '屏東大武太陽能案場 #1 饋線': 'Pingtung Dawu Solar Farm #1 Feeder',
    '苗栗通霄風力發電廠 #1 饋線': 'Miaoli Tongxiao Wind Farm #1 Feeder',
    '苗栗通霄風力發電廠 #2': 'Miaoli Tongxiao Wind Farm #2',
    '苗栗通霄風力發電廠 #2 饋線': 'Miaoli Tongxiao Wind Farm #2 Feeder',
  };

  if (map[name]) return map[name];

  // Dynamic naming rules
  // 1. Chain Convenience Store Branch #x
  if (name.startsWith('連鎖便利商店 門市 #')) {
    return name.replace('連鎖便利商店 門市 #', 'Chain Convenience Store Branch #');
  }
  // 2. Chain Store 2026 Projected Purchase Branch #x
  if (name.startsWith('連鎖 2026 預計增購門市 #')) {
    return name.replace('連鎖 2026 預計增購門市 #', 'Chain Store 2026 Projected Purchase Branch #');
  }
  // 3. Chain Store 2024 Renewal Branch #x
  if (name.startsWith('連鎖 2024 續約門市 #')) {
    return name.replace('連鎖 2024 續約門市 #', 'Chain Store 2024 Renewal Branch #');
  }
  // 4. Famous Chain Home Furnishing Brand store names
  if (name.startsWith('知名連鎖家居商 ')) {
    const storeMap: Record<string, string> = {
      '敦北店': 'Dunbei Store',
      '新莊店': 'Xinzhuang Store',
      '桃園店': 'Taoyuan Store',
      '台中店': 'Taichung Store',
      '高雄店': 'Kaohsiung Store',
    };
    const storeZh = name.substring('知名連鎖家居商 '.length);
    if (storeMap[storeZh]) {
      return `Famous Chain Home Furnishing Brand ${storeMap[storeZh]}`;
    }
  }

  return name;
};
