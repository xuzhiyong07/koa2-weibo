/**
 * @description sequelize实例
 * @author xuzhiy
 */

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONF
let conf = {
    host,
    dialect: 'mysql'
}

if (isTest) {
    conf.logging = () => {} // 测试时禁止打印sql语句
}

if (isProd) {
    // 线上环境使用连接池
    conf.pool = {
        max: 5, // 连接池中最大连接数量
        min: 0,
        idle: 10000 // 如果一个连接池10秒内没有被使用就会被释放
    }
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq
