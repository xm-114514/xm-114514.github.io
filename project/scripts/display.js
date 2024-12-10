export function updateDisplay(x, y, t) {
  const dataCanvas = document.getElementById('dataCanvas');
  const ctx = dataCanvas.getContext('2d');

  // Canvas をクリア
  ctx.clearRect(0, 0, dataCanvas.width, dataCanvas.height);

  // 背景を塗りつぶす
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, dataCanvas.width, dataCanvas.height);

  // テキストの描画
  ctx.font = '16px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText('Simulation Data', 10, 30);
  ctx.fillText(`X Position: ${x.toFixed(2)} m`, 10, 60);
  ctx.fillText(`Y Position: ${y.toFixed(2)} m`, 10, 90);
  ctx.fillText(`Time: ${t.toFixed(2)} s`, 10, 120);
}
