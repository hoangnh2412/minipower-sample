import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { ACCOUNT_ROUTES, AdminLayout, RegisterPage } from '@jarvis/core'
import { demoTenant, mainNav, secondaryNav } from './app/navigation'
import {
  CatalogPage,
  currencyConfig,
  customerConfig,
  EinvoiceForgotPasswordPage,
  EinvoiceLoginPage,
  InvoiceFormPage,
  invoicePaths,
  InvoiceListPage,
  InvoiceTemplateListPage,
  Nd70DeclarationPage,
  paymentMethodConfig,
  productConfig,
  uomConfig,
  CompanyInfoPage,
  RoleListPage,
  UserListPage,
  CtsRegistrationPage,
  SystemParamsPage,
} from './features'

function LoginRoute() {
  const navigate = useNavigate()
  return (
    <EinvoiceLoginPage
      onSuccess={() => navigate('/hoa-don', { replace: true })}
      onForgotClick={() => navigate(ACCOUNT_ROUTES.forgotPassword)}
      onRegisterClick={() => navigate(ACCOUNT_ROUTES.register)}
    />
  )
}

function ForgotPasswordRoute() {
  const navigate = useNavigate()
  return (
    <EinvoiceForgotPasswordPage onBackToLogin={() => navigate(ACCOUNT_ROUTES.login)} />
  )
}

function InvoiceListRoute() {
  const navigate = useNavigate()
  return <InvoiceListPage onNavigate={(path) => navigate(path)} />
}

function InvoiceCreateRoute() {
  const navigate = useNavigate()
  return (
    <InvoiceFormPage
      mode="create"
      onCancel={() => navigate(invoicePaths.list)}
      onSaved={() => navigate(invoicePaths.list)}
    />
  )
}

function InvoiceEditRoute() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  return (
    <InvoiceFormPage
      mode="edit"
      invoiceId={id}
      onCancel={() => navigate(invoicePaths.list)}
      onSaved={() => navigate(invoicePaths.list)}
    />
  )
}

function InvoiceCopyRoute() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  return (
    <InvoiceFormPage
      mode="copy"
      invoiceId={id}
      onCancel={() => navigate(invoicePaths.list)}
      onSaved={() => navigate(invoicePaths.list)}
    />
  )
}

export default function App() {
  return (
    <Routes>
      <Route path={ACCOUNT_ROUTES.login} element={<LoginRoute />} />
      <Route path={ACCOUNT_ROUTES.register} element={<RegisterPage />} />
      <Route path={ACCOUNT_ROUTES.forgotPassword} element={<ForgotPasswordRoute />} />

      <Route
        element={
          <AdminLayout
            mainNav={mainNav}
            secondaryNav={secondaryNav}
            user={demoTenant}
            logoTitle="einvoice"
            logoSubtitle="HĐĐT"
            defaultTitle="Hóa đơn điện tử"
          />
        }
      >
        <Route index element={<Navigate to="/hoa-don" replace />} />
        <Route path="/hoa-don" element={<InvoiceListRoute />} />
        <Route path="/hoa-don/tao-moi" element={<InvoiceCreateRoute />} />
        <Route path="/hoa-don/sao-chep/:id" element={<InvoiceCopyRoute />} />
        <Route path="/hoa-don/:id/sua" element={<InvoiceEditRoute />} />

        <Route path="/phat-hanh/mau-hoa-don" element={<InvoiceTemplateListPage />} />
        <Route path="/phat-hanh/to-khai-nd70" element={<Nd70DeclarationPage />} />

        <Route path="/danh-muc/khach-hang" element={<CatalogPage config={customerConfig} />} />
        <Route path="/danh-muc/hang-hoa" element={<CatalogPage config={productConfig} />} />
        <Route path="/danh-muc/don-vi-tinh" element={<CatalogPage config={uomConfig} />} />
        <Route path="/danh-muc/tien-te" element={<CatalogPage config={currencyConfig} />} />
        <Route
          path="/danh-muc/hinh-thuc-thanh-toan"
          element={<CatalogPage config={paymentMethodConfig} />}
        />

        <Route path="/he-thong/thong-tin-dn" element={<CompanyInfoPage />} />
        <Route path="/he-thong/nhom-quyen" element={<RoleListPage />} />
        <Route path="/he-thong/nguoi-dung" element={<UserListPage />} />
        <Route path="/he-thong/dang-ky-cts" element={<CtsRegistrationPage />} />
        <Route path="/he-thong/tham-so" element={<SystemParamsPage />} />
      </Route>

      <Route path="*" element={<Navigate to={ACCOUNT_ROUTES.login} replace />} />
    </Routes>
  )
}
