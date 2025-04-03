import React, { useState } from 'react'
import { Form, Input, Button, message, Card } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import users from './users'
import { setToken } from '@/utils/auth'
import styles from './index.module.less'

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  // 处理登录
  const handleLogin = async values => {
    try {
      setLoading(true)
      // 模拟登录请求
      const user = users.find(item => item.username === values.username && item.password === values.password)

      if (user) {
        setToken(user.token)
        message.success('登录成功！')
        // 确保使用 replace 模式跳转
        setTimeout(() => {
          navigate('/', { replace: true })
        }, 100)
      } else {
        message.error('用户名或密码错误！')
      }
    } catch (error) {
      message.error('登录失败，请重试！')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.loginContainer}>

      <Card className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <div className={styles.logo}>
            <img src="/logo.png" alt="logo" />
          </div>
          <h2>系统登录</h2>
        </div>

        <Form
          name="login"
          onFinish={handleLogin}
          size="large"
          initialValues={{
            username: 'admin',
            password: '123456'
          }}>
          <Form.Item name="username" rules={[{ required: true, message: '请输入用户名！' }]}>
            <Input prefix={<UserOutlined className={styles.prefixIcon} />} placeholder="用户名: admin" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: '请输入密码！' }]}>
            <Input.Password prefix={<LockOutlined className={styles.prefixIcon} />} placeholder="密码: 123456" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block className={styles.loginButton}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
