// 字符串替换工具
module.exports = function (context) {
  return context.replace(
    /connection\.sendNotification\("initialized"\)/,
    'connection.sendNotification("initialized",{})'
  );
};
