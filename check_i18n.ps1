$files = @(
  "components/AcessoRapidoBK.tsx",
  "components/ArtigoPageContent.tsx",
  "components/BKSectionPopup.tsx",
  "components/BannerCentralSuporte.tsx",
  "components/BannerContato.tsx",
  "components/BannerFiltros.tsx",
  "components/BannerLinhaNeo.tsx",
  "components/BaseConhecimentoSuporte.tsx",
  "components/BeneficiosAppAiIot.tsx",
  "components/CartProvider.tsx",
  "components/ChatWidget.tsx",
  "components/CheckoutUp.tsx",
  "components/ColecaoAcessorios.tsx",
  "components/ColecaoMediaNetwork.tsx",
  "components/ComoFuncionaParceria.tsx",
  "components/ComoPodemoAjudar.tsx",
  "components/CompareProductos.tsx",
  "components/CompatibilidadeAppAiIot.tsx",
  "components/ConectadoAppAiIot.tsx",
  "components/ContatoInfoForm.tsx",
  "components/CtaBK.tsx",
  "components/CtaBanner.tsx",
  "components/CtaBannerAppAiIot.tsx",
  "components/CtaBannerContato.tsx",
  "components/CtaBannerNeo.tsx",
  "components/CtaBannerParceria.tsx",
  "components/DiferenciaisSuporte.tsx",
  "components/ExpansaoGlobalBanner.tsx",
  "components/ExpansaoGlobalCta.tsx",
  "components/ExpansaoGlobalPilares.tsx",
  "components/ExpansaoGlobalPresenca.tsx",
  "components/FaleComEquipeSuporte.tsx",
  "components/Features.tsx",
  "components/FeaturesAppAiIot.tsx",
  "components/FiltrosNeo.tsx",
  "components/FiltrosPremium.tsx",
  "components/FluxoInteligenteAppAiIot.tsx",
  "components/Footer.tsx",
  "components/Header.tsx",
  "components/Hero.tsx",
  "components/HeroAppAiIot.tsx",
  "components/IdiomasGrid.tsx",
  "components/LinhaNeo.tsx",
  "components/LinhaPremium.tsx",
  "components/LinhasFiltros.tsx",
  "components/ModelosParceria.tsx",
  "components/NeoMedia.tsx",
  "components/NeoMediaAplicacoes.tsx",
  "components/NeoMediaBanner.tsx",
  "components/NeoMediaFeatures.tsx",
  "components/NeoMediaHowItWorks.tsx",
  "components/NeoMediaPlatform.tsx",
  "components/NeoVsPremium.tsx",
  "components/OperacaoGlobal.tsx",
  "components/OutrosCanais.tsx",
  "components/ParceirosAcessorios.tsx",
  "components/Parceria.tsx",
  "components/ParceriaBanner.tsx",
  "components/PlanoInteligenteAppAiIot.tsx",
  "components/PlatformAppAiIot.tsx",
  "components/PlatformCta.tsx",
  "components/PlatformEcosystem.tsx",
  "components/PlatformExperience.tsx",
  "components/PlatformFeatures.tsx",
  "components/PlatformGlobal.tsx",
  "components/PlatformHero.tsx",
  "components/PlatformProfiles.tsx",
  "components/PoliticasPrivacidadeBanner.tsx",
  "components/PoliticasPrivacidadeContent.tsx",
  "components/PorqueNeo.tsx",
  "components/PorqueParceiro.tsx",
  "components/ProdutosParceria.tsx",
  "components/RecursosAppAiIot.tsx",
  "components/ReposicaoInteligente.tsx",
  "components/SobreBanner.tsx",
  "components/SobreEmpresas.tsx",
  "components/SobreHistoria.tsx",
  "components/SobreImpacto.tsx",
  "components/SobreQuemSomos.tsx",
  "components/SobreValores.tsx",
  "components/TecnologiaBanner.tsx",
  "components/TecnologiaCtaBanner.tsx",
  "components/TecnologiaFazDiferenca.tsx",
  "components/TecnologiaSustentSection.tsx",
  "components/TermosDeUsoBanner.tsx",
  "components/TermosDeUsoConteudo.tsx",
  "components/TopicPopup.tsx",
  "components/TransformaVidas.tsx",
  "components/ui/Buttons.tsx",
  "components/ui/LanguageSelector.tsx",
  "components/ui/PremiumSlideshow.tsx",
  "components/ui/SlideDot.tsx",
  "context/LanguageContext.tsx",
  "lib/products.ts",
  "lib/checkin-products.ts"
)

$requiredLangs = @("pt", "pt-pt", "en", "en-gb", "es", "fr", "de", "it", "zh", "ja", "ko", "sv", "fi", "ru", "ro", "he")

foreach ($file in $files) {
  if (-not (Test-Path $file)) { continue }
  
  $content = Get-Content $file -Raw
  
  $found = @()
  foreach ($lang in $requiredLangs) {
    if ($content -match "`"$lang`"\s*:|'$lang'\s*:") {
      $found += $lang
    }
  }
  
  $found = $found | Select-Object -Unique
  $missing = $requiredLangs | Where-Object { $_ -notin $found }
  
  if ($missing) {
    Write-Host "$file"
    Write-Host "  Found: $($found.Count)/16 - $($found -join ', ')"
    Write-Host "  Missing: $($missing -join ', ')"
    Write-Host ""
  }
}
