const CF = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/';
const image = (name: string, width = 2048) => `https://images.higgs.ai/?default=1&output=webp&url=${encodeURIComponent(CF + name)}&w=${width}&q=85`;

// Owner-supplied portrait/video; the showcase plate is the video's final frame.
export const laptopAssets = {
  plate: '/images/hero/iqbal-studio.png',
  casePlate: '/images/hero/iqbal-laptop-end.webp',
  badge: image('hf_20261111_001143_65c037e6-0768-4b12-9f17-17be132ce16b.png', 1200),
  transition: '/videos/iqbal-laptop-dive.mp4',
};

export function laptopPose(width: number, height: number, mode: 'hero' | 'case', ticketHeight = 190, descriptionHeight = 90) {
  const mobile = width <= 820;
  const unit = mobile ? width / 430 : Math.min(width / 1440, height / 900);
  let scale: number, x: number, y: number;
  if (mobile && mode === 'hero') {
    scale = Math.min(width / 760, 0.53 * height / 810);
    x = Math.max(width - 1440 * scale, width / 2 - 900 * scale);
    y = height - 810 * scale;
  } else if (mobile) {
    const navHeight = 0.022 * height + 64;
    const uiBottom = 62 + ticketHeight + 18 + Math.max(60, descriptionHeight) + 14;
    scale = Math.min((width - 28) / 920, Math.max(0.16, (height - navHeight - uiBottom) / 610));
    x = width / 2 - 720 * scale;
    y = height - navHeight - 700 * scale;
  } else if (mode === 'case') {
    // Keep the photographed laptop in its own column, clear of the project panel.
    const edge = Math.max(24, Math.min(40, width * 0.025));
    const panelWidth = Math.max(280, Math.min(340, width * 0.23));
    const stageWidth = width - panelWidth - edge * 3;
    const top = 88, bottom = 80;
    scale = Math.min(stageWidth / 920, Math.max(0.16, (height - top - bottom) / 610));
    x = edge + stageWidth / 2 - 720 * scale;
    y = top + Math.max(0, (height - top - bottom - 610 * scale) / 2) - 90 * scale;
  } else {
    scale = Math.max(width / 1440, height / 810);
    y = 0;
    x = (width - 1440 * scale) / 2;
  }
  const left = Math.max(0, -x / scale);
  const right = Math.min(1440, (width - x) / scale);
  const pad = 18 / scale;
  return {
    x, y, scale, mobile, unit,
    wordLeft: left + 2 * pad, wordWidth: (right - left) * 0.36,
    badgeLeft: right - 230,
    badgeTop: 45,
    scriptLeft: left + 2 * pad,
  };
}
