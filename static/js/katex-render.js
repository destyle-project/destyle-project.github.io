// KaTeX 自动渲染器 v1.1
const initKatex = () => {
    // 配置选项
    const config = {
      selectors: ['.katex', '.math-inline'],  // 支持多个选择器
      errorColor: '#cc0000',
      displayMode: false,  // 默认行内模式
      macros: {
        "\\RR": "\\mathbb{R}"  // 自定义宏示例
      }
    };
  
    // 渲染函数
    const renderElements = () => {
      document.querySelectorAll(config.selectors.join(',')).forEach(el => {
        try {
          const tex = el.dataset.tex ? el.dataset.tex : el.textContent;
          katex.render(tex, el, {
            ...config,
            throwOnError: !!el.dataset.strict  // 通过 data-strict 控制严格模式
          });
        } catch(e) {
          el.style.color = config.errorColor;
          console.error(`KaTeX 渲染失败: ${e.message}`, el);
        }
      });
    };
  
    // 初始化检测
    if (typeof katex !== 'undefined') {
      renderElements();
    } else {
      console.warn('KaTeX 未加载，延迟初始化');
      document.addEventListener('katex-loaded', renderElements);
    }
  };
  
  // 自动初始化
  document.addEventListener('DOMContentLoaded', initKatex);