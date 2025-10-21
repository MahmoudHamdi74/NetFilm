import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <App />
)
import { registerSW } from "virtual:pwa-register";

registerSW({
  onNeedRefresh() {
    if (confirm("يوجد تحديث جديد، هل تريد إعادة تحميل التطبيق؟")) {
      window.location.reload();
    }
  },
  onOfflineReady() {
    console.log("✅ التطبيق جاهز للعمل بدون إنترنت!");
  },
});
