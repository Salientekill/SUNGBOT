# Informações do Baileys Modificado

## Backup Salvo

O módulo Baileys modificado foi salvo em:
```
/root/baileys-modificado-backup
```

## Instalação Automática

O projeto usa um fork modificado do Baileys:
```json
"@whiskeysockets/baileys": "github:Salientekill/Baileys"
```

Ao executar `npm install`, o fork correto será instalado automaticamente do GitHub.

## Restauração Manual

Se precisar restaurar manualmente:

```bash
# Opção 1: Copiar do backup
rm -rf node_modules/@whiskeysockets/baileys
cp -r /root/baileys-modificado-backup node_modules/@whiskeysockets/baileys

# Opção 2: Reinstalar (recomendado)
rm -rf node_modules
npm install
```

## Modificações

O fork contém modificações customizadas em:
- Configurações padrão (Defaults)
- Utilitários de navegador
- Gerenciamento de eventos
- Recebimento de mensagens
- Gerenciamento de chats

## Documentação Completa

Veja: `/root/baileys-modificado-backup/README-BACKUP.md`
