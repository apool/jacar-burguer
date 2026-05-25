# watch-and-push.ps1
# Monitora alteracoes nos arquivos e faz push automatico para o GitHub/Vercel

$repoPath = $PSScriptRoot
$projectPath = Join-Path $repoPath "project"

Write-Host "Monitorando alteracoes em: $projectPath"
Write-Host "Pressione Ctrl+C para parar.`n"

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $projectPath
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true
$watcher.NotifyFilter = [System.IO.NotifyFilters]::LastWrite -bor [System.IO.NotifyFilters]::FileName

$timer = New-Object System.Timers.Timer
$timer.Interval = 2000
$timer.AutoReset = $false

$pushPending = $false

$action = {
    $script:pushPending = $true
    $script:timer.Stop()
    $script:timer.Start()
}

$timerAction = {
    if ($script:pushPending) {
        $script:pushPending = $false
        Write-Host "`n[$(Get-Date -Format 'HH:mm:ss')] Alteracao detectada — enviando para o Vercel..."

        Set-Location $script:repoPath

        $changes = git status --short 2>&1
        if ($changes) {
            git add -A
            $msg = "update: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
            git commit -m $msg
            git push origin master
            Write-Host "[OK] Site atualizado no Vercel!`n"
        } else {
            Write-Host "[INFO] Nenhuma alteracao para enviar.`n"
        }
    }
}

Register-ObjectEvent $watcher "Changed" -Action $action | Out-Null
Register-ObjectEvent $watcher "Created" -Action $action | Out-Null
Register-ObjectEvent $watcher "Deleted" -Action $action | Out-Null
Register-ObjectEvent $watcher "Renamed" -Action $action | Out-Null
Register-ObjectEvent $timer "Elapsed" -Action $timerAction | Out-Null

$timer.Start()

try {
    while ($true) { Start-Sleep -Seconds 1 }
} finally {
    $watcher.EnableRaisingEvents = $false
    $watcher.Dispose()
    $timer.Dispose()
    Write-Host "Monitor encerrado."
}
