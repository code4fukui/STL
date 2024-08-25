export const calcNormal = (p1, p2, p3) => {
  // 2. 2つのベクトルを計算
  const v1 = {
    x: p2.x - p1.x,
    y: p2.y - p1.y,
    z: p2.z - p1.z,
  };    
  const v2 = {
    x: p3.x - p1.x,
    y: p3.y - p1.y,
    z: p3.z - p1.z,
  };
  // 3. 外積を計算
  const normal = {
    x: v1.y * v2.z - v1.z * v2.y,
    y: v1.z * v2.x - v1.x * v2.z,
    z: v1.x * v2.y - v1.y * v2.x
  };
  // 4. 法線ベクトルを正規化（単位ベクトルにする）
  const length = Math.sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z);
  return {
      x: normal.x / length,
      y: normal.y / length,
      z: normal.z / length,
  };
};
