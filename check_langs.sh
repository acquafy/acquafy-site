#!/bin/bash

files=(
"components/AcessoRapidoBK.tsx"
"components/ArtigoPageContent.tsx"
"components/BKSectionPopup.tsx"
"components/BannerCentralSuporte.tsx"
"components/BannerContato.tsx"
"components/BannerFiltros.tsx"
"components/BannerLinhaNeo.tsx"
"components/BaseConhecimentoSuporte.tsx"
"components/BeneficiosAppAiIot.tsx"
"components/CartProvider.tsx"
"components/ChatWidget.tsx"
"components/CheckoutUp.tsx"
"components/ColecaoAcessorios.tsx"
"components/ColecaoMediaNetwork.tsx"
"components/ComoFuncionaParceria.tsx"
"components/ComoPodemoAjudar.tsx"
"components/CompareProductos.tsx"
"components/CompatibilidadeAppAiIot.tsx"
"components/ConectadoAppAiIot.tsx"
"components/ContatoInfoForm.tsx"
"components/CtaBK.tsx"
"components/CtaBanner.tsx"
"components/CtaBannerAppAiIot.tsx"
"components/CtaBannerContato.tsx"
"components/CtaBannerNeo.tsx"
"components/CtaBannerParceria.tsx"
"components/DiferenciaisSuporte.tsx"
"components/ExpansaoGlobalBanner.tsx"
"components/ExpansaoGlobalCta.tsx"
"components/ExpansaoGlobalPilares.tsx"
"components/ExpansaoGlobalPresenca.tsx"
"components/FaleComEquipeSuporte.tsx"
"components/Features.tsx"
"components/FeaturesAppAiIot.tsx"
"components/FiltrosNeo.tsx"
"components/FiltrosPremium.tsx"
"components/FluxoInteligenteAppAiIot.tsx"
"components/Footer.tsx"
"components/Header.tsx"
"components/Hero.tsx"
"components/HeroAppAiIot.tsx"
"components/IdiomasGrid.tsx"
"components/LinhaNeo.tsx"
"components/LinhaPremium.tsx"
"components/LinhasFiltros.tsx"
"components/ModelosParceria.tsx"
"components/NeoMedia.tsx"
"components/NeoMediaAplicacoes.tsx"
"components/NeoMediaBanner.tsx"
"components/NeoMediaFeatures.tsx"
"components/NeoMediaHowItWorks.tsx"
"components/NeoMediaPlatform.tsx"
"components/NeoVsPremium.tsx"
"components/OperacaoGlobal.tsx"
"components/OutrosCanais.tsx"
"components/ParceirosAcessorios.tsx"
"components/Parceria.tsx"
"components/ParceriaBanner.tsx"
"components/PlanoInteligenteAppAiIot.tsx"
"components/PlatformAppAiIot.tsx"
"components/PlatformCta.tsx"
"components/PlatformEcosystem.tsx"
"components/PlatformExperience.tsx"
"components/PlatformFeatures.tsx"
"components/PlatformGlobal.tsx"
"components/PlatformHero.tsx"
"components/PlatformProfiles.tsx"
"components/PoliticasPrivacidadeBanner.tsx"
"components/PoliticasPrivacidadeContent.tsx"
"components/PorqueNeo.tsx"
"components/PorqueParceiro.tsx"
"components/ProdutosParceria.tsx"
"components/RecursosAppAiIot.tsx"
"components/ReposicaoInteligente.tsx"
"components/SobreBanner.tsx"
"components/SobreEmpresas.tsx"
"components/SobreHistoria.tsx"
"components/SobreImpacto.tsx"
"components/SobreQuemSomos.tsx"
"components/SobreValores.tsx"
"components/TecnologiaBanner.tsx"
"components/TecnologiaCtaBanner.tsx"
"components/TecnologiaFazDiferenca.tsx"
"components/TecnologiaSustentSection.tsx"
"components/TermosDeUsoBanner.tsx"
"components/TermosDeUsoConteudo.tsx"
"components/TopicPopup.tsx"
"components/TransformaVidas.tsx"
"components/ui/Buttons.tsx"
"components/ui/LanguageSelector.tsx"
"components/ui/PremiumSlideshow.tsx"
"components/ui/SlideDot.tsx"
"context/LanguageContext.tsx"
"lib/products.ts"
"lib/checkin-products.ts"
)

langs=("pt" "pt-pt" "en" "en-gb" "es" "fr" "de" "it" "zh" "ja" "ko" "sv" "fi" "ru" "ro" "he")

for file in "${files[@]}"; do
  [ ! -f "$file" ] && continue
  
  found=()
  for lang in "${langs[@]}"; do
    if grep -q "\"$lang\"\s*:" "$file" 2>/dev/null; then
      found+=("$lang")
    fi
  done
  
  if [ ${#found[@]} -lt 16 ] && [ ${#found[@]} -gt 0 ]; then
    echo "$file"
    echo "  Found: ${#found[@]}/16 - ${found[*]}"
    missing=()
    for lang in "${langs[@]}"; do
      found_flag=0
      for f in "${found[@]}"; do
        if [ "$f" = "$lang" ]; then
          found_flag=1
          break
        fi
      done
      if [ $found_flag -eq 0 ]; then
        missing+=("$lang")
      fi
    done
    echo "  Missing: ${missing[*]}"
    echo ""
  fi
done
