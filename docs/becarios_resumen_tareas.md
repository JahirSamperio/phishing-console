# 🚀 Tareas para Becarios - Red Team Campaign
## Problema: Los correos van a Spam | Solución: Configurar SPF/DKIM/DMARC

**Asignado por**: Alejandro Romero (CEH)  
**Objetivo**: Sacar los emails de spam para la campaña de 250+ empleados  
**Deadline**: Antes del próximo lunes  
**Importancia**: 🔴 CRÍTICA

---

## 📋 Resumen Rápido

**Problema**: Los emails de `recursos.humanos@xaldgital.com` llegan a la carpeta de Spam en Gmail

**Causa**: Gmail no verifica que el dominio sea legítimo (falta autenticación)

**Solución**: Configurar 3 registros DNS:
1. **SPF** - Dice qué servidores pueden enviar emails
2. **DKIM** - Firma digitalmente los emails
3. **DMARC** - Política de qué hacer con emails sospechosos

**Resultado**: Los emails irán a Inbox (no Spam) ✅

---

## 🎯 Tu Tarea

**Configura estos 3 registros DNS en el panel de control de xaldgital.com**

Tiempo total: **30-45 minutos**

---

## 📖 Guías Disponibles

**Tenemos 2 documentos para ti**:

1. **GUÍA COMPLETA** (Léela primero)
   - Paso a paso con screenshots
   - Todas las opciones explicadas
   - Troubleshooting completo
   - 📄 Archivo: `BECARIOS_GUIA_DNS_SPF_DKIM_DMARC.md`

2. **CONFIGURACIÓN JAVASCRIPT** (Si trabajas con Node.js)
   - Código completo
   - Ejemplos funcionando
   - Variables de entorno
   - 📄 Archivo: `BECARIOS_JAVASCRIPT_EMAIL_CONFIG.md`

---

## ✅ Checklist de Tareas

### TAREA 1: SPF Record (10 minutos)

- [ ] Abre el panel de control de hosting
- [ ] Ve a: DNS Zone Editor / Advanced DNS / DNS Settings
- [ ] Busca el dominio: `xaldgital.com`
- [ ] Agrega un nuevo registro **TXT** con:
  - **Name**: `xaldgital.com`
  - **Value**: `v=spf1 include:google.com include:sendgrid.net include:mailgun.org ~all`
  - **TTL**: `3600`
- [ ] Haz clic en "Add" o "Save"
- [ ] Verifica en: https://mxtoolbox.com/spf.aspx
  - Debe mostrar: ✅ PASS

### TAREA 2: DKIM Record (10 minutos)

**Opción A - Si tu hosting es cPanel**:
- [ ] Ve a: Home → Email → Email Deliverability
- [ ] En la sección DKIM, haz clic en: "Enable DKIM Signing"
- [ ] Selecciona: `xaldgital.com`
- [ ] Haz clic en: "Install a DKIM record"
- [ ] ✅ Listo (se instala automáticamente)

**Opción B - Si no ves esa opción**:
- [ ] Ve a: DNS Zone Editor
- [ ] Agrega un nuevo registro **TXT** con:
  - **Name**: `default._domainkey.xaldgital.com`
  - **Value**: El valor largo que te da tu hosting
  - **TTL**: `3600`
- [ ] Verifica en: https://dmarcian.com/dkim-survey/
  - Ingresa: `default._domainkey.xaldgital.com`
  - Debe mostrar: ✅ DKIM record found and valid

### TAREA 3: DMARC Record (10 minutos)

- [ ] Ve a: DNS Zone Editor
- [ ] Agrega un nuevo registro **TXT** con:
  - **Name**: `_dmarc.xaldgital.com`
  - **Value**: `v=DMARC1; p=quarantine; rua=mailto:security-test@xaldgital.com; ruf=mailto:security-test@xaldgital.com; fo=1`
  - **TTL**: `3600`
- [ ] Haz clic en "Add" o "Save"
- [ ] Verifica en: https://mxtoolbox.com/dmarc.aspx
  - Ingresa: `xaldgital.com`
  - Debe mostrar: ✅ DMARC record found

---

## 🧪 VERIFICACIÓN FINAL (5-10 minutos)

### Test 1: Mail-tester Score

1. Ve a: https://www.mail-tester.com/
2. **Copia** la dirección de prueba (ej: `test-xxxxx@mail-tester.com`)
3. **Envía un email** desde `recursos.humanos@xaldgital.com` a esa dirección
4. **Espera 30 segundos**
5. Regresa y haz clic en: "Then check your score"

**Resultado esperado**: **8-10 de 10** ✅

Si obtienes menos de 7:
- Revisa que todos los registros estén bien
- Espera 15 minutos más (propagación DNS)
- Intenta de nuevo

### Test 2: Verificadores Online

- https://mxtoolbox.com/spf.aspx → Ingresa `xaldgital.com` → Debe mostrar ✅ PASS
- https://dmarcian.com/dkim-survey/ → Ingresa `default._domainkey.xaldgital.com` → ✅ Valid
- https://mxtoolbox.com/dmarc.aspx → Ingresa `xaldgital.com` → ✅ Found

### Test 3: Gmail Real

1. Envía un email a tu cuenta personal de Gmail
2. **Verifica que llegue a Inbox** (NO a Spam)
3. Si está en Spam:
   - Revisa que SPF/DKIM/DMARC estén ✅ correctos
   - Espera más tiempo de propagación

---

## 📊 Resultado Esperado

Después de completar todas las tareas:

```
✅ SPF: Configurado y verificado
✅ DKIM: Habilitado y verificado
✅ DMARC: Configurado y verificado
✅ Mail-tester score: 9-10 de 10
✅ DNS totalmente propagado
✅ Correos de prueba llegan a Inbox (no Spam)
```

---

## 📝 Reporte Final

**Cuando termines TODO, crea un resumen con**:

```
Red Team - Reporte de Configuración DNS
============================================

TAREA 1 - SPF
- [ ] Registro agregado
- [ ] MXToolbox muestra: PASS
- Fecha de completación: ___________

TAREA 2 - DKIM
- [ ] Registro agregado/habilitado
- [ ] DMarcian muestra: VALID
- Fecha de completación: ___________

TAREA 3 - DMARC
- [ ] Registro agregado
- [ ] MXToolbox muestra: FOUND
- Fecha de completación: ___________

VERIFICACIÓN
- [ ] Mail-tester score: _____ / 10
- [ ] Correo de prueba: ¿Llegó a Inbox? SÍ / NO
- [ ] Todos los verificadores: ✅ PASS

Estado: ✅ LISTO PARA CAMPAÑA
Responsable: _____________________
Fecha: ____________________________
```

**Envía este reporte a Alex cuando termines**

---

## ⏱️ Timeline Sugerido

| Día | Tarea | Responsable |
|-----|-------|-------------|
| **Hoy** | Leer guías (20 min) | Todos |
| **Hoy** | Tareas 1-3 DNS (30 min) | Becario 1 |
| **Mañana** | Verificación final (10 min) | Becario 2 |
| **Mañana** | Reporte final | Becario Lead |
| **Próxima semana** | ✅ Lanzar campaña a 250+ | Red Team Completo |

---

## 🆘 Si Hay Problemas

### "No encuentro DNS Zone Editor"

**Pregunta**: ¿Qué hosting usan?
- cPanel → Home → Domains → Zone Editor
- Plesk → Domains → DNS Settings
- Otro → Contacta a soporte del hosting

### "Agregué el registro pero no funciona"

**Checklist**:
- [ ] Copié exactamente (sin espacios extras)
- [ ] Escribí bien `xaldgital.com` (con la "i" que falta)
- [ ] Seleccioné tipo "TXT"
- [ ] Esperé 15-30 minutos (propagación)
- [ ] Probé con Mail-tester

### "Los emails siguen en spam"

**Debugging paso a paso**:
1. Verifica: https://mxtoolbox.com/spf.aspx
2. Verifica: https://dmarcian.com/dkim-survey/
3. Verifica: https://mxtoolbox.com/dmarc.aspx
4. Si todo dice ✅ pero sigue en spam → Contacta a Alex

---

## 📞 Contactos

Si algo no funciona:
- **Alex (CEO)**: alejandro.romero@xaldigital.com
- **Slack**: #red-team-campaign
- **Emergencia**: +56 XX XXXX XXXX

---

## 🎓 Recordatorios Importantes

1. **NO cambies nada que no esté en esta lista**
2. **Copia exactamente** - Un carácter diferente rompe todo
3. **Espera propagación DNS** - Puede tardar hasta 48 horas
4. **Prueba antes de reportar** - Usa Mail-tester
5. **Documenta todo** - Screenshots de verificadores

---

## 🎯 Objetivos de la Campaña

Después de que configuren esto correctamente:

- ✅ 250+ empleados recibirán email de prueba
- ✅ Los emails llegarán a Inbox (no Spam)
- ✅ Se enseñará a detectar phishing
- ✅ Red Team + Blue Team aprenderá en acción
- ✅ Xal Digital estará más segura 🛡️

**Tu trabajo es crítico para el éxito de la campaña**

---

## ✅ Checklist de Entrega

Cuando termines, verifica que has:

- [ ] Configurado SPF, DKIM, DMARC
- [ ] Verificado con herramientas online
- [ ] Obtenido Mail-tester score ≥ 8/10
- [ ] Enviado correo de prueba a Gmail
- [ ] Verificado que llegó a Inbox
- [ ] Creado reporte final
- [ ] Entregado reporte a Alex
- [ ] Documentado cualquier problema encontrado

---

**¡Vamos, equipo! Esto es el MVP de la campaña** 🚀

El éxito depende de ustedes. Adelante. 💪