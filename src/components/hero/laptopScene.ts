const CF = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/';
const image = (name: string, width = 2048) => `https://images.higgs.ai/?default=1&output=webp&url=${encodeURIComponent(CF + name)}&w=${width}&q=85`;

// These are the brief's original hosted assets; no local re-encoding or copies.
export const laptopAssets = {
  plate: image('hf_20261111_001031_a09dc558-2c69-4e05-83a4-5f01ebdd1363.png'),
  casePlate: image('hf_20261111_001031_4a7c3fd9-2168-4219-9736-096a17bbb0e2.png'),
  cut: image('hf_20261111_001143_ec356b1a-50a2-4b50-82fc-e346c914a406.png'),
  badge: image('hf_20261111_001143_65c037e6-0768-4b12-9f17-17be132ce16b.png', 1200),
  transition: CF + 'hf_20261111_001144_2b054228-95af-41d5-922d-b02979fe485b.mp4',
};

export function laptopPose(width: number, height: number, mode: 'hero' | 'case', ticketHeight = 190, descriptionHeight = 90) {
  const mobile = width <= 820;
  const unit = mobile ? width / 430 : Math.min(width / 1440, height / 900);
  let scale: number, x: number, y: number;
  if (mobile && mode === 'hero') {
    scale = Math.min(width / 650, 0.62 * height / 810);
    x = width / 2 - 805 * scale;
    y = height - 790 * scale;
  } else if (mobile) {
    const navHeight = 0.022 * height + 64;
    const uiBottom = 62 + ticketHeight + 18 + Math.max(60, descriptionHeight) + 14;
    scale = Math.min((width - 28) / 905, Math.max(0.16, (height - navHeight - uiBottom) / 667));
    x = width / 2 - 720 * scale;
    y = height - navHeight - 762 * scale;
  } else {
    const cover = Math.max(width / 1440, height / 810);
    const top = 66 * unit;
    const fit = (height - top - 28 * unit) / 683;
    scale = mode === 'hero' ? cover : Math.min(cover, fit);
    y = mode === 'hero' ? 0 : fit >= cover ? Math.min(0, Math.max(height - 810 * scale, top - 79 * scale)) : top - 79 * fit;
    x = (width - 1440 * scale) / 2;
  }
  const left = Math.max(0, -x / scale);
  const right = Math.min(1440, (width - x) / scale);
  const pad = 18 / scale;
  return {
    x, y, scale, mobile, unit,
    wordLeft: left + 0.6 * pad, wordWidth: right - left - 1.2 * pad,
    badgeLeft: Math.min(986, right - pad - 417),
    badgeTop: Math.min(-165, Math.min(810, (height - y) / scale) - 56 / scale - 935),
    scriptLeft: left + pad + 70,
  };
}
