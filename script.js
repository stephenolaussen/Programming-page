// Awesome Programming Navbar jQuery Functionality

$(document).ready(function() {
    
    console.log('🚀 DevSpace initializing...');
    
    // Clear any existing typing intervals
    if (window.typingInterval) {
        clearInterval(window.typingInterval);
        clearTimeout(window.typingInterval);
    }
    
    // Original function for the button
    function firstButton() {
        $("#firstButton").addClass("list-group-item-success");
    }
    
    // Function to change text (if referenced elsewhere)
    window.changetext = function(element) {
        $(element).text("I've been clicked!").addClass("text-success fw-bold");
    };
    
    // Initialize homepage animations and functionality FIRST
    initializeHomepage();
    
    // ===== NAVBAR FUNCTIONALITY =====
    
    // Simple and reliable dropdown functionality
    function initDropdowns() {
        console.log('🔧 Initializing dropdowns...');
        
        // Remove any existing event handlers first
        $('.dropdown-toggle').off('click');
        $(document).off('click.dropdown');
        
        // Close all dropdowns
        function closeAllDropdowns() {
            $('.dropdown-menu').removeClass('show').hide();
            $('.dropdown-toggle').removeClass('active');
        }
        
        // Toggle specific dropdown
        function toggleDropdown($toggle) {
            const $menu = $toggle.siblings('.dropdown-menu');
            const isOpen = $menu.hasClass('show');
            
            // Close all dropdowns first
            closeAllDropdowns();
            
            // If it wasn't open, open it
            if (!isOpen) {
                $menu.addClass('show').show();
                $toggle.addClass('active');
                console.log('✅ Dropdown opened:', $toggle.attr('id'));
            }
        }
        
        // Languages dropdown
        $('#languagesDropdown').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🗣️ Languages dropdown clicked');
            toggleDropdown($(this));
        });
        
        // Dev Tools dropdown
        $('#devToolsDropdown').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🛠️ Dev Tools dropdown clicked');
            toggleDropdown($(this));
        });
        
        // Profile dropdown
        $('#profileDropdown').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('👤 Profile dropdown clicked');
            toggleDropdown($(this));
        });
        
        // Close dropdowns when clicking outside
        $(document).on('click.dropdown', function(e) {
            if (!$(e.target).closest('.dropdown').length) {
                closeAllDropdowns();
            }
        });
        
        // Prevent dropdown from closing when clicking inside
        $('.dropdown-menu').on('click', function(e) {
            e.stopPropagation();
        });
        
        console.log('✅ Dropdowns initialized');
        console.log('- Languages dropdown:', $('#languagesDropdown').length > 0 ? 'Found' : 'NOT FOUND');
        console.log('- Dev Tools dropdown:', $('#devToolsDropdown').length > 0 ? 'Found' : 'NOT FOUND');
        console.log('- Profile dropdown:', $('#profileDropdown').length > 0 ? 'Found' : 'NOT FOUND');
    }
    
    // Initialize dropdowns
    initDropdowns();
    
    // Brand logo hover effect
    $('#brand-link').hover(
        function() {
            $(this).find('.brand-icon').addClass('fa-spin');
        },
        function() {
            $(this).find('.brand-icon').removeClass('fa-spin');
        }
    );
    
    // Navigation link click handler
    $('.navbar-nav .nav-link[data-section]').click(function(e) {
        e.preventDefault();
        
        // Remove active class from all nav links
        $('.navbar-nav .nav-link').removeClass('active');
        
        // Add active class to clicked link
        $(this).addClass('active');
        
        const section = $(this).data('section');
        showLoadingIndicator();
        
        // Simulate loading content
        setTimeout(function() {
            hideLoadingIndicator();
            showNotification(`Loading ${section.charAt(0).toUpperCase() + section.slice(1)} section...`, 'success');
        }, 1000);
    });
    
    // Programming language selection
    $('.dropdown-item[data-lang]').click(function(e) {
        e.preventDefault();
        
        const language = $(this).data('lang');
        const languageName = $(this).text().trim();
        
        showLoadingIndicator();
        
        // Animate the selection
        $(this).addClass('selected-language');
        
        setTimeout(function() {
            hideLoadingIndicator();
            showNotification(`Selected ${languageName} - Loading resources...`, 'info');
        }, 800);
        
        // Log the selection
        console.log(`Programming language selected: ${language}`);
    });
    
    // Dev tools selection
    $('.dropdown-item[data-tool]').click(function(e) {
        e.preventDefault();
        
        const tool = $(this).data('tool');
        const toolName = $(this).text().trim();
        
        showLoadingIndicator();
        
        setTimeout(function() {
            hideLoadingIndicator();
            showNotification(`${toolName} tools loaded successfully!`, 'success');
        }, 1200);
        
        console.log(`Dev tool selected: ${tool}`);
    });
    
    // Search functionality
    $('#searchBtn').click(function() {
        performSearch();
    });
    
    $('#searchInput').keypress(function(e) {
        if (e.which === 13) { // Enter key
            performSearch();
        }
    });
    
    // Live search suggestions
    $('#searchInput').on('input', function() {
        const query = $(this).val();
        if (query.length > 2) {
            showSearchSuggestions(query);
        } else {
            hideSearchSuggestions();
        }
    });
    
    // GitHub button functionality
    $('#githubBtn').off('click').on('click', function(e) {
        e.preventDefault();
        console.log('🐙 GitHub button clicked!');
        showLoadingIndicator();
        
        $(this).html('<i class="fab fa-github fa-spin"></i> Loading Profile...');
        
        // Load GitHub profile
        loadGitHubProfile('stephenolaussen');
    });
    
    // Theme toggle functionality
    let isDarkTheme = false;
    $('#themeToggle').click(function() {
        isDarkTheme = !isDarkTheme;
        
        if (isDarkTheme) {
            $('body').addClass('dark-theme');
            $(this).html('<i class="fas fa-sun"></i>');
            showNotification('Dark theme activated!', 'info');
        } else {
            $('body').removeClass('dark-theme');
            $(this).html('<i class="fas fa-moon"></i>');
            showNotification('Light theme activated!', 'info');
        }
        
        // Animate the theme change
        $('body').addClass('theme-transition');
        setTimeout(function() {
            $('body').removeClass('theme-transition');
        }, 500);
    });
    
    // Profile dropdown actions
    $('.dropdown-item[data-profile]').click(function(e) {
        e.preventDefault();
        
        const action = $(this).data('profile');
        const actionName = $(this).text().trim();
        
        showLoadingIndicator();
        
        setTimeout(function() {
            hideLoadingIndicator();
            showNotification(`${actionName} section opened!`, 'success');
        }, 800);
        
        console.log(`Profile action: ${action}`);
    });
    
    // Logout functionality
    $('#logoutBtn').click(function(e) {
        e.preventDefault();
        
        if (confirm('Are you sure you want to logout?')) {
            showLoadingIndicator();
            
            setTimeout(function() {
                hideLoadingIndicator();
                showNotification('Successfully logged out!', 'warning');
                console.log('User logged out');
            }, 1000);
        }
    });
    
    // More languages functionality
    $('#more-languages').click(function(e) {
        e.preventDefault();
        
        showLoadingIndicator();
        
        setTimeout(function() {
            hideLoadingIndicator();
            showLanguageModal();
        }, 800);
    });
    
    // ===== UTILITY FUNCTIONS =====
    
    function showLoadingIndicator() {
        $('#loadingIndicator').fadeIn(300);
    }
    
    function hideLoadingIndicator() {
        $('#loadingIndicator').fadeOut(300);
    }
    
    function showNotification(message, type = 'info') {
        // Remove any existing notifications
        $('.custom-notification').remove();
        
        const notification = $(`
            <div class="custom-notification alert alert-${type} alert-dismissible fade show" 
                 style="position: fixed; top: 80px; right: 20px; z-index: 9999; min-width: 300px;">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `);
        
        $('body').append(notification);
        
        // Auto-remove after 3 seconds
        setTimeout(function() {
            notification.fadeOut(300, function() {
                $(this).remove();
            });
        }, 3000);
    }
    
    function performSearch() {
        const query = $('#searchInput').val().trim();
        
        if (query === '') {
            showNotification('Please enter a search term!', 'warning');
            return;
        }
        
        showLoadingIndicator();
        $('#searchBtn').html('<i class="fas fa-spinner fa-spin"></i>');
        
        // Simulate search
        setTimeout(function() {
            hideLoadingIndicator();
            $('#searchBtn').html('<i class="fas fa-search"></i>');
            showNotification(`Found ${Math.floor(Math.random() * 50) + 1} results for "${query}"`, 'success');
            
            console.log(`Searching for: ${query}`);
        }, 1200);
    }
    
    function showSearchSuggestions(query) {
        const suggestions = [
            'JavaScript functions',
            'Python classes',
            'React components',
            'CSS animations',
            'HTML semantic tags',
            'Git commands',
            'Docker containers',
            'API endpoints'
        ];
        
        const filteredSuggestions = suggestions.filter(s => 
            s.toLowerCase().includes(query.toLowerCase())
        );
        
        if (filteredSuggestions.length > 0) {
            console.log('Search suggestions:', filteredSuggestions);
        }
    }
    
    function hideSearchSuggestions() {
        // Implementation for hiding suggestions
        console.log('Hiding search suggestions');
    }
    
    function showLanguageModal() {
        const languages = [
            'TypeScript', 'C++', 'C#', 'Go', 'Rust', 'Swift', 'Kotlin', 
            'Ruby', 'Scala', 'Perl', 'Haskell', 'Clojure', 'Erlang'
        ];
        
        let languageList = languages.map(lang => 
            `<li class="list-group-item bg-dark text-light border-secondary">
                <i class="fas fa-code text-primary me-2"></i>${lang}
             </li>`
        ).join('');
        
        const modal = $(`
            <div class="modal fade" id="languageModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content bg-dark text-light">
                        <div class="modal-header border-secondary">
                            <h5 class="modal-title">
                                <i class="fas fa-code text-primary me-2"></i>All Programming Languages
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <ul class="list-group">
                                ${languageList}
                            </ul>
                        </div>
                        <div class="modal-footer border-secondary">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `);
        
        $('body').append(modal);
        
        // Show the modal
        const languageModal = new bootstrap.Modal(document.getElementById('languageModal'));
        languageModal.show();
        
        // Remove modal from DOM when hidden
        $('#languageModal').on('hidden.bs.modal', function() {
            $(this).remove();
        });
    }
    
    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.programming-navbar').addClass('navbar-scrolled');
        } else {
            $('.programming-navbar').removeClass('navbar-scrolled');
        }
    });
    
    // Add navbar scroll styles
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .navbar-scrolled {
                background: rgba(30, 30, 46, 0.95) !important;
                backdrop-filter: blur(10px);
                transition: all 0.3s ease;
            }
            
            .theme-transition {
                transition: all 0.5s ease;
            }
            
            .selected-language {
                background: linear-gradient(45deg, #4CAF50, #2196F3) !important;
                transform: scale(1.02);
            }
        `)
        .appendTo('head');
    
    // Welcome message
    showNotification('Welcome to DevSpace! Your awesome programming hub is ready! 🚀', 'success');
    
    // Debug: Test if buttons are clickable
    console.log('🔍 DevSpace Debug Info:');
    console.log('- jQuery loaded:', typeof $ !== 'undefined');
    console.log('- Start Coding button exists:', $('#startCodingBtn').length > 0);
    console.log('- Explore Projects button exists:', $('#exploreProjectsBtn').length > 0);
    console.log('- Dev Tools dropdown exists:', $('#devToolsDropdown').length > 0);
    console.log('- Tool cards found:', $('.tool-card').length);
    console.log('- Tool buttons found:', $('.tool-btn').length);
    
    // Add comprehensive button handlers
    setupAllButtonHandlers();
    
    // Add simple click test
    $(document).on('click', '*', function(e) {
        console.log('Click detected on:', e.target.tagName, e.target.id, e.target.className);
    });
    
    // ===== HOMEPAGE FUNCTIONALITY =====
    
    // Initialize homepage animations
    initializeHomepage();
    
    // Ensure all dropdowns are closed on page load
    $('.dropdown-menu').removeClass('show').hide();
    $('.dropdown-toggle').removeClass('show').attr('aria-expanded', 'false');
    
    console.log('🚀 DevSpace Navbar initialized with jQuery!');
});

// ===== HOMEPAGE FUNCTIONS =====

function initializeHomepage() {
    // Prevent multiple initializations
    if (window.homepageInitialized) {
        return;
    }
    window.homepageInitialized = true;
    
    console.log('🏠 Initializing homepage...');
    
    // Initialize basic dropdowns
    $('.dropdown-toggle').on('click', function(e) {
        e.preventDefault();
        const $menu = $(this).siblings('.dropdown-menu');
        $('.dropdown-menu').not($menu).removeClass('show').hide();
        $menu.toggleClass('show').toggle();
    });
    
    // Close dropdowns when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.dropdown').length) {
            $('.dropdown-menu').removeClass('show').hide();
        }
    });
    
    // Typing animation for code window
    startTypingAnimation();
    
    // Counter animation for stats
    animateCounters();
    
    // Initialize hero buttons
    setupHeroButtons();
    
    // Initialize dev tools
    setupDevTools();
    
    // Setup contact links
    setupContactLinks();
    
    console.log('✅ Homepage initialized successfully');
}

function startTypingAnimation() {
    const codeLines = [
        "const developer = {",
        "  name: 'DevSpace User',",
        "  skills: ['JavaScript', 'Python', 'React'],",
        "  passion: 'Building amazing things',",
        "  motto: 'Code. Learn. Innovate.'",
        "};",
        "",
        "function createAwesomeProject() {",
        "  const project = new Project({",
        "    innovation: true,",
        "    quality: 'premium',",
        "    impact: 'world-changing'",
        "  });",
        "  ",
        "  return project.deploy();",
        "}",
        "",
        "// Let's build the future! 🚀",
        "createAwesomeProject();"
    ];
    
    const codeElement = $('#typingCode');
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let fullText = "";
    
    // Clear any existing intervals and content
    if (window.typingInterval) {
        clearInterval(window.typingInterval);
    }
    codeElement.empty();
    
    function typeNextCharacter() {
        if (currentLineIndex < codeLines.length) {
            const currentLine = codeLines[currentLineIndex];
            
            if (currentCharIndex < currentLine.length) {
                // Add one character to our full text
                fullText += currentLine.charAt(currentCharIndex);
                codeElement.text(fullText);
                currentCharIndex++;
            } else {
                // End of line - add newline and move to next line
                fullText += '\n';
                codeElement.text(fullText);
                currentLineIndex++;
                currentCharIndex = 0;
            }
        } else {
            // Animation complete - restart after delay
            setTimeout(() => {
                fullText = "";
                currentLineIndex = 0;
                currentCharIndex = 0;
                codeElement.empty();
                startTypingAnimation();
            }, 3000);
            return;
        }
        
        // Continue typing
        window.typingInterval = setTimeout(typeNextCharacter, 50);
    }
    
    // Start the animation
    typeNextCharacter();
}

function animateCounters() {
    $('.stat-number').each(function() {
        const $this = $(this);
        const target = parseInt($this.data('target'));
        let current = 0;
        const increment = target / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            $this.text(Math.floor(current));
        }, 30);
    });
}

function setupHeroButtons() {
    console.log('🔧 Setting up hero buttons...');
    
    // Remove any existing handlers first
    $('#startCodingBtn').off('click');
    $('#exploreProjectsBtn').off('click');
    
    // Start Coding Button - Direct VS Code modal
    $('#startCodingBtn').on('click', function(e) {
        e.preventDefault();
        console.log('🚀 START CODING BUTTON CLICKED!');
        
        // Show immediate feedback
        showNotification('Opening VS Code setup...', 'info');
        
        const $btn = $(this);
        const originalHtml = $btn.html();
        $btn.html('<i class="fas fa-spinner fa-spin"></i> Opening VS Code...');
        
        // Open VS Code modal directly
        setTimeout(() => {
            $btn.html(originalHtml);
            $('#vscodeModal').modal('show');
            showNotification('VS Code setup ready!', 'success');
            console.log('✅ VS Code modal opened');
        }, 800);
    });
    
    // Explore Projects Button  
    $('#exploreProjectsBtn').on('click', function(e) {
        e.preventDefault();
        console.log('👁️ EXPLORE PROJECTS BUTTON CLICKED!');
        
        // Show immediate feedback
        showNotification('Loading projects...', 'info');
        
        const $btn = $(this);
        const originalHtml = $btn.html();
        $btn.html('<i class="fas fa-spinner fa-spin"></i> Loading...');
        
        setTimeout(() => {
            $btn.html(originalHtml);
            showNotification('Project gallery loaded!', 'success');
            
            // Scroll to GitHub preview section
            const $target = $('#github-preview');
            if ($target.length > 0) {
                $('html, body').animate({
                    scrollTop: $target.offset().top - 100
                }, 1000);
                console.log('✅ Scrolled to GitHub preview section');
            } else {
                console.log('❌ GitHub preview section not found');
            }
        }, 800);
    });
    
    console.log('✅ Hero buttons setup complete');
    console.log('- Start Coding button:', $('#startCodingBtn').length > 0 ? 'Found' : 'NOT FOUND');
    console.log('- Explore Projects button:', $('#exploreProjectsBtn').length > 0 ? 'Found' : 'NOT FOUND');
    console.log('- VS Code modal:', $('#vscodeModal').length > 0 ? 'Found' : 'NOT FOUND');
}

// Function to open VS Code
function openVSCode() {
    try {
        // Try multiple methods to open VS Code
        
        // Method 1: Try to open current directory in VS Code
        const currentPath = window.location.pathname.replace('/index.html', '').replace('/', '');
        
        // Create a temporary link to try opening VS Code
        const vscodeUrl = `vscode://file/${currentPath}`;
        
        // Try to open VS Code protocol
        const link = document.createElement('a');
        link.href = vscodeUrl;
        link.click();
        
        // Fallback: Show VS Code opening instructions
        setTimeout(() => {
            showVSCodeModal();
        }, 2000);
        
    } catch (error) {
        console.log('VS Code protocol not available, showing instructions');
        showVSCodeModal();
    }
}

// Show VS Code modal with instructions
function showVSCodeModal() {
    const vscodeModal = $(`
        <div class="modal fade" id="vscodeModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content bg-dark text-light">
                    <div class="modal-header border-secondary">
                        <h5 class="modal-title">
                            <i class="fas fa-code text-primary me-2"></i>Open Project in VS Code
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="vscode-instructions">
                            <div class="instruction-step">
                                <div class="step-number">1</div>
                                <div class="step-content">
                                    <h6>Open Terminal in VS Code</h6>
                                    <p>Press <kbd>Ctrl</kbd> + <kbd>\`</kbd> to open the integrated terminal</p>
                                </div>
                            </div>
                            
                            <div class="instruction-step">
                                <div class="step-number">2</div>
                                <div class="step-content">
                                    <h6>Navigate to Your Project</h6>
                                    <div class="code-block">
                                        <code>cd "d:\\Noroff Backend\\Visual studio code Prosjekter\\Git Noroff school\\Programming page"</code>
                                        <button class="btn btn-sm btn-outline-primary copy-btn" onclick="copyToClipboard(this)">
                                            <i class="fas fa-copy"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="instruction-step">
                                <div class="step-number">3</div>
                                <div class="step-content">
                                    <h6>Open Current Directory</h6>
                                    <div class="code-block">
                                        <code>code .</code>
                                        <button class="btn btn-sm btn-outline-primary copy-btn" onclick="copyToClipboard(this)">
                                            <i class="fas fa-copy"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="instruction-step">
                                <div class="step-number">4</div>
                                <div class="step-content">
                                    <h6>Start Coding! 🚀</h6>
                                    <p>Your DevSpace project will open in VS Code ready for development</p>
                                </div>
                            </div>
                            
                            <div class="quick-actions mt-4">
                                <h6>Quick Actions:</h6>
                                <button class="btn btn-primary me-2" onclick="startLiveServer()">
                                    <i class="fas fa-play"></i> Start Live Server
                                </button>
                                <button class="btn btn-success me-2" onclick="openGitPanel()">
                                    <i class="fab fa-git-alt"></i> Open Git Panel
                                </button>
                                <button class="btn btn-info" onclick="showExtensions()">
                                    <i class="fas fa-puzzle-piece"></i> Recommended Extensions
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer border-secondary">
                        <button type="button" class="btn btn-outline-success" onclick="refreshPage()">
                            <i class="fas fa-sync-alt"></i> Refresh Page
                        </button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `);
    
    // Remove existing modal
    $('#vscodeModal').remove();
    
    // Add and show modal
    $('body').append(vscodeModal);
    const modal = new bootstrap.Modal(document.getElementById('vscodeModal'));
    modal.show();
    
    // Clean up
    $('#vscodeModal').on('hidden.bs.modal', function() {
        $(this).remove();
    });
}

function setupContactLinks() {
    $('.contact-link').click(function(e) {
        e.preventDefault();
        
        const platform = $(this).data('platform');
        const platformNames = {
            github: 'GitHub',
            linkedin: 'LinkedIn', 
            email: 'Email Client',
            discord: 'Discord'
        };
        
        showLoadingIndicator();
        
        setTimeout(() => {
            hideLoadingIndicator();
            showNotification(`Opening ${platformNames[platform]}...`, 'success');
        }, 800);
    });
}

// ===== DEV TOOLS FUNCTIONALITY =====

function setupDevTools() {
    // Check if tools are already added to prevent duplicates
    if ($('.dropdown-item[data-tool="json"]').length > 0) {
        console.log('ℹ️ Dev tools already added, skipping...');
        return; // Tools already added
    }
    
    console.log('🛠️ Setting up dev tools...');
    
    // Clear any existing tools first
    $('.dropdown-menu.programming-dropdown').first().find('.dropdown-item[data-tool]').remove();
    $('.dropdown-menu.programming-dropdown').first().find('.dropdown-divider').first().remove();
    
    // Add new tools at the beginning of the dropdown
    const newToolsHtml = `
        <li><a class="dropdown-item" href="#" data-tool="json">
            <i class="fas fa-code text-info"></i> JSON Formatter
        </a></li>
        <li><a class="dropdown-item" href="#" data-tool="color">
            <i class="fas fa-palette text-warning"></i> Color Picker
        </a></li>
        <li><a class="dropdown-item" href="#" data-tool="base64">
            <i class="fas fa-key text-success"></i> Base64 Encoder
        </a></li>
        <li><a class="dropdown-item" href="#" data-tool="url">
            <i class="fas fa-link text-primary"></i> URL Encoder
        </a></li>
        <li><a class="dropdown-item" href="#" data-tool="qr">
            <i class="fas fa-qrcode text-info"></i> QR Generator
        </a></li>
        <li><a class="dropdown-item" href="#" data-tool="hash">
            <i class="fas fa-hashtag text-warning"></i> Hash Generator
        </a></li>
        <li><hr class="dropdown-divider"></li>
    `;
    
    $('.dropdown-menu.programming-dropdown').first().prepend(newToolsHtml);
    
    // Remove any existing event handlers to prevent duplicates
    $(document).off('click.devtools', '.dropdown-item[data-tool]');
    
    // Add single event handler for all tool clicks
    $(document).on('click.devtools', '.dropdown-item[data-tool]', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const tool = $(this).data('tool');
        console.log('🔧 Dropdown tool clicked:', tool);
        if (window.openTool) {
            window.openTool(tool);
        } else {
            console.error('❌ openTool function not available');
        }
    });
    
    console.log('✅ Dev tools setup complete');
}

// Make openTool function globally accessible
window.openTool = function(toolType) {
    const toolModal = new bootstrap.Modal(document.getElementById('devToolModal'));
    const modalTitle = $('#toolModalTitle');
    const modalBody = $('#toolModalBody');
    const actionBtn = $('#toolActionBtn');
    
    // Tool configurations
    const tools = {
        json: {
            title: '<i class="fas fa-code"></i> JSON Formatter & Validator',
            content: `
                <div class="tool-input-group">
                    <label for="jsonInput">Enter JSON to format:</label>
                    <textarea id="jsonInput" class="form-control" rows="8" placeholder='{"name": "John", "age": 30, "city": "New York"}'></textarea>
                </div>
                <div class="tool-output" id="jsonOutput" style="display: none;"></div>
            `,
            action: 'Format JSON'
        },
        color: {
            title: '<i class="fas fa-palette"></i> Color Picker & Palette Generator',
            content: `
                <div class="row">
                    <div class="col-md-6">
                        <div class="tool-input-group">
                            <label for="colorPicker">Pick a Color:</label>
                            <input type="color" id="colorPicker" class="form-control" value="#4CAF50" style="height: 60px;">
                        </div>
                        <div class="tool-input-group">
                            <label for="hexInput">Or Enter Hex Code:</label>
                            <input type="text" id="hexInput" class="form-control" placeholder="#4CAF50" value="#4CAF50">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="tool-output" id="colorOutput">
                            <h6>Color Information:</h6>
                            <div id="colorInfo"></div>
                            <h6 class="mt-3">Color Palette:</h6>
                            <div id="colorPalette" class="d-flex flex-wrap gap-2"></div>
                        </div>
                    </div>
                </div>
            `,
            action: 'Generate Palette'
        },
        base64: {
            title: '<i class="fas fa-key"></i> Base64 Encoder/Decoder',
            content: `
                <div class="tool-input-group">
                    <label for="base64Input">Enter text to encode/decode:</label>
                    <textarea id="base64Input" class="form-control" rows="6" placeholder="Hello World!"></textarea>
                </div>
                <div class="d-flex gap-2 mb-3">
                    <button class="btn btn-success" onclick="encodeBase64()">Encode</button>
                    <button class="btn btn-warning" onclick="decodeBase64()">Decode</button>
                </div>
                <div class="tool-output" id="base64Output" style="display: none;"></div>
            `,
            action: 'Encode'
        },
        url: {
            title: '<i class="fas fa-link"></i> URL Encoder/Decoder',
            content: `
                <div class="tool-input-group">
                    <label for="urlInput">Enter URL or text:</label>
                    <textarea id="urlInput" class="form-control" rows="6" placeholder="https://example.com/search?q=hello world"></textarea>
                </div>
                <div class="d-flex gap-2 mb-3">
                    <button class="btn btn-success" onclick="encodeURL()">Encode</button>
                    <button class="btn btn-warning" onclick="decodeURL()">Decode</button>
                </div>
                <div class="tool-output" id="urlOutput" style="display: none;"></div>
            `,
            action: 'Encode'
        },
        qr: {
            title: '<i class="fas fa-qrcode"></i> QR Code Generator',
            content: `
                <div class="tool-input-group">
                    <label for="qrInput">Enter text or URL for QR code:</label>
                    <textarea id="qrInput" class="form-control" rows="4" placeholder="https://yourwebsite.com"></textarea>
                </div>
                <div class="tool-input-group">
                    <label for="qrSize">QR Code Size:</label>
                    <select id="qrSize" class="form-control">
                        <option value="200">200x200</option>
                        <option value="300" selected>300x300</option>
                        <option value="400">400x400</option>
                        <option value="500">500x500</option>
                    </select>
                </div>
                <div class="tool-output" id="qrOutput" style="display: none;">
                    <div id="qrCodeContainer" class="text-center"></div>
                </div>
            `,
            action: 'Generate QR'
        },
        hash: {
            title: '<i class="fas fa-hashtag"></i> Hash Generator',
            content: `
                <div class="tool-input-group">
                    <label for="hashInput">Enter text to hash:</label>
                    <textarea id="hashInput" class="form-control" rows="6" placeholder="Your text here..."></textarea>
                </div>
                <div class="tool-input-group">
                    <label for="hashType">Hash Type:</label>
                    <select id="hashType" class="form-control">
                        <option value="md5">MD5</option>
                        <option value="sha1">SHA-1</option>
                        <option value="sha256" selected>SHA-256</option>
                    </select>
                </div>
                <div class="tool-output" id="hashOutput" style="display: none;"></div>
            `,
            action: 'Generate Hash'
        }
    };
    
    const tool = tools[toolType];
    if (!tool) return;
    
    modalTitle.html(tool.title);
    modalBody.html(tool.content);
    actionBtn.text(tool.action);
    
    // Set up tool-specific functionality
    actionBtn.off('click').on('click', () => processToolAction(toolType));
    
    // Initialize tool-specific features
    if (toolType === 'color') {
        initColorTool();
    }
    
    toolModal.show();
};

function processToolAction(toolType) {
    switch(toolType) {
        case 'json':
            formatJSON();
            break;
        case 'color':
            generateColorPalette();
            break;
        case 'base64':
            encodeBase64();
            break;
        case 'url':
            encodeURL();
            break;
        case 'qr':
            generateQRCode();
            break;
        case 'hash':
            generateHash();
            break;
    }
}

// JSON Formatter
window.formatJSON = function() {
    const input = $('#jsonInput').val().trim();
    const output = $('#jsonOutput');
    
    if (!input) {
        showNotification('Please enter JSON to format!', 'warning');
        return;
    }
    
    try {
        const parsed = JSON.parse(input);
        const formatted = JSON.stringify(parsed, null, 2);
        
        output.html(`
            <h6 class="text-success">✓ Valid JSON - Formatted:</h6>
            <pre style="color: #4CAF50;">${formatted}</pre>
        `).show();
        
        showNotification('JSON formatted successfully!', 'success');
    } catch (error) {
        output.html(`
            <h6 class="text-danger">✗ Invalid JSON:</h6>
            <pre style="color: #f44336;">${error.message}</pre>
        `).show();
        
        showNotification('Invalid JSON format!', 'danger');
    }
}

// Color Tool
function initColorTool() {
    $('#colorPicker, #hexInput').on('input change', function() {
        const color = this.type === 'color' ? this.value : $('#hexInput').val();
        updateColorInfo(color);
    });
    
    // Initialize with default color
    updateColorInfo('#4CAF50');
}

function updateColorInfo(hex) {
    try {
        const rgb = hexToRgb(hex);
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        
        $('#colorInfo').html(`
            <div style="background: ${hex}; width: 100%; height: 50px; border-radius: 8px; margin-bottom: 1rem;"></div>
            <div><strong>HEX:</strong> ${hex}</div>
            <div><strong>RGB:</strong> rgb(${rgb.r}, ${rgb.g}, ${rgb.b})</div>
            <div><strong>HSL:</strong> hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)</div>
        `);
        
        // Sync inputs
        $('#colorPicker').val(hex);
        $('#hexInput').val(hex);
    } catch (error) {
        $('#colorInfo').html('<div class="text-danger">Invalid color format</div>');
    }
}

window.generateColorPalette = function() {
    const baseColor = $('#colorPicker').val();
    const palette = generatePaletteColors(baseColor);
    
    let paletteHtml = '';
    palette.forEach(color => {
        paletteHtml += `
            <div style="background: ${color}; width: 40px; height: 40px; border-radius: 8px; cursor: pointer;" 
                 title="${color}" onclick="updateColorInfo('${color}')"></div>
        `;
    });
    
    $('#colorPalette').html(paletteHtml);
    showNotification('Color palette generated!', 'success');
}

// Base64 Functions
window.encodeBase64 = function() {
    const input = $('#base64Input').val();
    if (!input) {
        showNotification('Please enter text to encode!', 'warning');
        return;
    }
    
    try {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        $('#base64Output').html(`
            <h6 class="text-success">Encoded Result:</h6>
            <pre>${encoded}</pre>
        `).show();
        showNotification('Text encoded successfully!', 'success');
    } catch (error) {
        showNotification('Encoding failed!', 'danger');
    }
}

window.decodeBase64 = function() {
    const input = $('#base64Input').val();
    if (!input) {
        showNotification('Please enter Base64 to decode!', 'warning');
        return;
    }
    
    try {
        const decoded = decodeURIComponent(escape(atob(input)));
        $('#base64Output').html(`
            <h6 class="text-success">Decoded Result:</h6>
            <pre>${decoded}</pre>
        `).show();
        showNotification('Base64 decoded successfully!', 'success');
    } catch (error) {
        $('#base64Output').html(`
            <h6 class="text-danger">Decoding Error:</h6>
            <pre>Invalid Base64 format</pre>
        `).show();
        showNotification('Invalid Base64 format!', 'danger');
    }
}

// URL Functions
window.encodeURL = function() {
    const input = $('#urlInput').val();
    if (!input) {
        showNotification('Please enter URL to encode!', 'warning');
        return;
    }
    
    const encoded = encodeURIComponent(input);
    $('#urlOutput').html(`
        <h6 class="text-success">Encoded URL:</h6>
        <pre>${encoded}</pre>
    `).show();
    showNotification('URL encoded successfully!', 'success');
}

window.decodeURL = function() {
    const input = $('#urlInput').val();
    if (!input) {
        showNotification('Please enter encoded URL to decode!', 'warning');
        return;
    }
    
    try {
        const decoded = decodeURIComponent(input);
        $('#urlOutput').html(`
            <h6 class="text-success">Decoded URL:</h6>
            <pre>${decoded}</pre>
        `).show();
        showNotification('URL decoded successfully!', 'success');
    } catch (error) {
        showNotification('Invalid URL encoding!', 'danger');
    }
}

// QR Code Generator
window.generateQRCode = function() {
    const input = $('#qrInput').val();
    const size = $('#qrSize').val();
    
    if (!input) {
        showNotification('Please enter text for QR code!', 'warning');
        return;
    }
    
    // Using QR Server API for QR code generation
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(input)}`;
    
    $('#qrCodeContainer').html(`
        <img src="${qrUrl}" alt="QR Code" style="max-width: 100%; border: 2px solid #4CAF50; border-radius: 8px;">
        <div class="mt-2">
            <a href="${qrUrl}" download="qrcode.png" class="btn btn-success btn-sm">
                <i class="fas fa-download"></i> Download QR Code
            </a>
        </div>
    `);
    
    $('#qrOutput').show();
    showNotification('QR Code generated successfully!', 'success');
}

// Hash Generator (Simple implementation - for production use crypto library)
window.generateHash = function() {
    const input = $('#hashInput').val();
    const hashType = $('#hashType').val();
    
    if (!input) {
        showNotification('Please enter text to hash!', 'warning');
        return;
    }
    
    // Simple hash implementation (for demo - use proper crypto library in production)
    let hash = '';
    
    if (hashType === 'md5') {
        hash = simpleHash(input, 32);
    } else if (hashType === 'sha1') {
        hash = simpleHash(input, 40);
    } else if (hashType === 'sha256') {
        hash = simpleHash(input, 64);
    }
    
    $('#hashOutput').html(`
        <h6 class="text-success">${hashType.toUpperCase()} Hash:</h6>
        <pre style="word-break: break-all;">${hash}</pre>
        <small class="text-warning">Note: This is a demo hash. Use proper crypto libraries in production.</small>
    `).show();
    
    showNotification(`${hashType.toUpperCase()} hash generated!`, 'success');
}

// Utility Functions
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
}

function generatePaletteColors(baseColor) {
    const rgb = hexToRgb(baseColor);
    const colors = [baseColor];
    
    // Generate complementary colors
    for (let i = 1; i <= 8; i++) {
        const factor = i * 0.1;
        const r = Math.min(255, Math.max(0, Math.round(rgb.r + (255 - rgb.r) * factor)));
        const g = Math.min(255, Math.max(0, Math.round(rgb.g + (255 - rgb.g) * factor)));
        const b = Math.min(255, Math.max(0, Math.round(rgb.b + (255 - rgb.b) * factor)));
        colors.push(`rgb(${r}, ${g}, ${b})`);
    }
    
    return colors;
}

function simpleHash(str, length) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    
    const hex = Math.abs(hash).toString(16);
    return hex.padStart(length, '0').substring(0, length);
}

// ===== GITHUB PROFILE INTEGRATION =====

// GitHub API configuration
const GITHUB_API_BASE = 'https://api.github.com';
let githubProfileData = null;

// Load GitHub profile data
async function loadGitHubProfile(username) {
    try {
        showLoadingIndicator();
        $('#githubBtn').html('<i class="fab fa-github fa-spin"></i> Loading Profile...');
        
        // Fetch user profile
        const profileResponse = await fetch(`${GITHUB_API_BASE}/users/${username}`);
        if (!profileResponse.ok) {
            throw new Error('Profile not found');
        }
        const profileData = await profileResponse.json();
        
        // Fetch user repositories
        const reposResponse = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=6`);
        const reposData = await reposResponse.json();
        
        // Store profile data
        githubProfileData = {
            profile: profileData,
            repos: reposData
        };
        
        // Display profile
        displayGitHubProfile(githubProfileData);
        
        // Update button
        $('#githubBtn').html('<i class="fab fa-github"></i> Profile Loaded');
        
        hideLoadingIndicator();
        showNotification('GitHub profile loaded successfully!', 'success');
        
    } catch (error) {
        console.error('GitHub API Error:', error);
        hideLoadingIndicator();
        $('#githubBtn').html('<i class="fab fa-github"></i> GitHub');
        showNotification('Failed to load GitHub profile. Please try again.', 'danger');
    }
}

// Display GitHub profile in modal
function displayGitHubProfile(data) {
    const { profile, repos } = data;
    
    // Create GitHub profile modal
    const githubModal = $(`
        <div class="modal fade" id="githubProfileModal" tabindex="-1" data-bs-backdrop="static">
            <div class="modal-dialog modal-xl">
                <div class="modal-content bg-dark text-light">
                    <div class="modal-header border-secondary">
                        <h5 class="modal-title">
                            <i class="fab fa-github text-success me-2"></i>GitHub Profile - ${profile.login}
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body" id="githubModalBody">
                        ${generateGitHubProfileHTML(profile, repos)}
                    </div>
                    <div class="modal-footer border-secondary">
                        <button type="button" class="btn btn-outline-success" onclick="refreshGitHubProfile('${profile.login}')">
                            <i class="fas fa-sync-alt"></i> Refresh
                        </button>
                        <a href="${profile.html_url}" target="_blank" class="btn btn-success">
                            <i class="fab fa-github"></i> View on GitHub
                        </a>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `);
    
    // Remove existing modal if any
    $('#githubProfileModal').remove();
    
    // Add modal to body
    $('body').append(githubModal);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('githubProfileModal'));
    modal.show();
    
    // Remove modal from DOM when hidden
    $('#githubProfileModal').on('hidden.bs.modal', function() {
        $(this).remove();
    });
}

// Generate GitHub profile HTML
function generateGitHubProfileHTML(profile, repos) {
    const joinedDate = new Date(profile.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const lastUpdate = new Date(profile.updated_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    return `
        <div class="github-profile-container">
            <!-- Profile Header -->
            <div class="row mb-4">
                <div class="col-md-3 text-center">
                    <img src="${profile.avatar_url}" alt="${profile.login}" 
                         class="github-avatar rounded-circle mb-3" width="150" height="150">
                    <h4 class="text-success">${profile.name || profile.login}</h4>
                    <p class="text-muted">@${profile.login}</p>
                    ${profile.bio ? `<p class="github-bio">"${profile.bio}"</p>` : ''}
                </div>
                <div class="col-md-9">
                    <div class="github-stats-grid">
                        <div class="github-stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-code text-primary"></i>
                            </div>
                            <div class="stat-info">
                                <h3>${profile.public_repos}</h3>
                                <p>Public Repositories</p>
                            </div>
                        </div>
                        <div class="github-stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-users text-success"></i>
                            </div>
                            <div class="stat-info">
                                <h3>${profile.followers}</h3>
                                <p>Followers</p>
                            </div>
                        </div>
                        <div class="github-stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-user-friends text-warning"></i>
                            </div>
                            <div class="stat-info">
                                <h3>${profile.following}</h3>
                                <p>Following</p>
                            </div>
                        </div>
                        <div class="github-stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-star text-info"></i>
                            </div>
                            <div class="stat-info">
                                <h3>${calculateTotalStars(repos)}</h3>
                                <p>Total Stars</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="github-info mt-4">
                        <div class="row">
                            <div class="col-md-6">
                                ${profile.location ? `
                                    <p><i class="fas fa-map-marker-alt text-danger me-2"></i>${profile.location}</p>
                                ` : ''}
                                ${profile.company ? `
                                    <p><i class="fas fa-building text-primary me-2"></i>${profile.company}</p>
                                ` : ''}
                                ${profile.blog ? `
                                    <p><i class="fas fa-link text-success me-2"></i>
                                        <a href="${profile.blog}" target="_blank" class="text-success">${profile.blog}</a>
                                    </p>
                                ` : ''}
                            </div>
                            <div class="col-md-6">
                                <p><i class="fas fa-calendar-alt text-warning me-2"></i>Joined ${joinedDate}</p>
                                <p><i class="fas fa-clock text-info me-2"></i>Last updated ${lastUpdate}</p>
                                ${profile.email ? `
                                    <p><i class="fas fa-envelope text-secondary me-2"></i>${profile.email}</p>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Repositories Section -->
            <div class="github-repos-section">
                <h5 class="mb-3">
                    <i class="fas fa-folder-open text-primary me-2"></i>Recent Repositories
                </h5>
                <div class="row">
                    ${generateRepositoriesHTML(repos)}
                </div>
            </div>
        </div>
    `;
}

// Generate repositories HTML
function generateRepositoriesHTML(repos) {
    if (!repos || repos.length === 0) {
        return '<div class="col-12"><p class="text-muted">No public repositories found.</p></div>';
    }
    
    return repos.map(repo => {
        const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        
        return `
            <div class="col-md-6 col-lg-4 mb-3">
                <div class="github-repo-card">
                    <div class="repo-header">
                        <h6 class="repo-name">
                            <i class="fas fa-book text-primary me-2"></i>
                            <a href="${repo.html_url}" target="_blank" class="text-light">${repo.name}</a>
                        </h6>
                        ${repo.private ? '<span class="badge bg-warning">Private</span>' : '<span class="badge bg-success">Public</span>'}
                    </div>
                    
                    ${repo.description ? `<p class="repo-description">${repo.description}</p>` : ''}
                    
                    <div class="repo-stats">
                        <div class="repo-stat">
                            <i class="fas fa-star text-warning"></i>
                            <span>${repo.stargazers_count}</span>
                        </div>
                        <div class="repo-stat">
                            <i class="fas fa-code-branch text-info"></i>
                            <span>${repo.forks_count}</span>
                        </div>
                        ${repo.language ? `
                            <div class="repo-stat">
                                <i class="fas fa-circle text-success"></i>
                                <span>${repo.language}</span>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="repo-footer">
                        <small class="text-muted">Updated ${updatedDate}</small>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Calculate total stars across all repositories
function calculateTotalStars(repos) {
    if (!repos || repos.length === 0) return 0;
    return repos.reduce((total, repo) => total + (repo.stargazers_count || 0), 0);
}

// Refresh GitHub profile
async function refreshGitHubProfile(username) {
    const refreshBtn = $('.btn-outline-success');
    const originalText = refreshBtn.html();
    
    refreshBtn.html('<i class="fas fa-spinner fa-spin"></i> Refreshing...');
    refreshBtn.prop('disabled', true);
    
    try {
        await loadGitHubProfile(username);
        refreshBtn.html('<i class="fas fa-check"></i> Refreshed');
        
        setTimeout(() => {
            refreshBtn.html(originalText);
            refreshBtn.prop('disabled', false);
        }, 2000);
        
    } catch (error) {
        refreshBtn.html('<i class="fas fa-exclamation-triangle"></i> Failed');
        refreshBtn.prop('disabled', false);
        
        setTimeout(() => {
            refreshBtn.html(originalText);
        }, 2000);
    }
}

// Add GitHub profile link to contact section
function updateContactLinksWithGitHub() {
    const githubContactLink = $('.contact-link[data-platform="github"]');
    if (githubContactLink.length > 0) {
        githubContactLink.off('click').on('click', function(e) {
            e.preventDefault();
            if (githubProfileData) {
                displayGitHubProfile(githubProfileData);
            } else {
                loadGitHubProfile('stephenolaussen');
            }
        });
    }
}

// Initialize GitHub profile integration on page load
$(document).ready(function() {
    // Prevent multiple GitHub initializations
    if (window.githubInitialized) {
        return;
    }
    window.githubInitialized = true;
    
    // Update contact links
    updateContactLinksWithGitHub();
    
    // Add option to profile dropdown to view GitHub profile
    const profileDropdownMenu = $('#profileDropdown').siblings('.dropdown-menu');
    
    // Check if GitHub profile item already exists
    if ($('#viewGithubProfile').length === 0) {
        const githubProfileItem = `
            <li><a class="dropdown-item" href="#" id="viewGithubProfile">
                <i class="fab fa-github"></i> GitHub Profile
            </a></li>
        `;
        profileDropdownMenu.find('li:first').after(githubProfileItem);
    }
    
    // Handle GitHub profile menu item click
    $(document).off('click', '#viewGithubProfile').on('click', '#viewGithubProfile', function(e) {
        e.preventDefault();
        if (githubProfileData) {
            displayGitHubProfile(githubProfileData);
        } else {
            loadGitHubProfile('stephenolaussen');
        }
    });
    
    // Initialize GitHub preview section
    initializeGitHubPreview();
});

// Initialize GitHub preview section
function initializeGitHubPreview() {
    // Prevent multiple initializations
    if (window.githubPreviewInitialized) {
        return;
    }
    window.githubPreviewInitialized = true;
    
    // Load basic GitHub stats for preview
    loadGitHubPreviewStats('stephenolaussen');
    
    // Handle load GitHub profile button click
    $('#loadGithubProfile').off('click').on('click', function() {
        if (githubProfileData) {
            displayGitHubProfile(githubProfileData);
        } else {
            loadGitHubProfile('stephenolaussen');
        }
    });
}

// Load GitHub preview stats (lightweight version)
async function loadGitHubPreviewStats(username) {
    try {
        // Add loading state
        $('#githubPreviewStats').addClass('github-preview-loading');
        
        const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);
        if (response.ok) {
            const data = await response.json();
            
            // Update preview stats
            $('#previewRepos').text(data.public_repos);
            $('#previewFollowers').text(data.followers);
            
            // For stars, we'll show a placeholder since we need to fetch repos
            $('#previewStars').text('~');
            
            // Remove loading state
            $('#githubPreviewStats').removeClass('github-preview-loading');
            
            // Animate the numbers
            animatePreviewNumbers();
            
        } else {
            throw new Error('Failed to load GitHub stats');
        }
    } catch (error) {
        console.error('GitHub Preview Error:', error);
        $('#previewRepos').text('--');
        $('#previewFollowers').text('--');
        $('#previewStars').text('--');
        $('#githubPreviewStats').removeClass('github-preview-loading');
    }
}

// Animate preview numbers
function animatePreviewNumbers() {
    $('.preview-stat-number').each(function() {
        const $this = $(this);
        const text = $this.text();
        
        // Skip if not a number
        if (text === '--' || text === '~' || isNaN(parseInt(text))) return;
        
        const target = parseInt(text);
        let current = 0;
        const increment = Math.max(1, Math.ceil(target / 50));
        
        $this.text('0');
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            $this.text(current);
        }, 30);
    });
}

// ===== VS CODE INTEGRATION FUNCTIONS =====

// Copy to clipboard function
function copyToClipboard(button) {
    const codeBlock = $(button).siblings('code');
    const text = codeBlock.text();
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            $(button).html('<i class="fas fa-check"></i>');
            setTimeout(() => {
                $(button).html('<i class="fas fa-copy"></i>');
            }, 2000);
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        $(button).html('<i class="fas fa-check"></i>');
        setTimeout(() => {
            $(button).html('<i class="fas fa-copy"></i>');
        }, 2000);
    }
}

// Start Live Server instructions
function startLiveServer() {
    showNotification('Install "Live Server" extension in VS Code, then right-click index.html → "Open with Live Server"', 'info');
}

// Open Git Panel instructions
function openGitPanel() {
    showNotification('Press Ctrl+Shift+G to open Git panel in VS Code', 'info');
}

// Show recommended extensions
function showExtensions() {
    const extensionsModal = $(`
        <div class="modal fade" id="extensionsModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content bg-dark text-light">
                    <div class="modal-header border-secondary">
                        <h5 class="modal-title">
                            <i class="fas fa-puzzle-piece text-success me-2"></i>Recommended VS Code Extensions
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="extension-list">
                            <div class="extension-item">
                                <i class="fas fa-server text-primary"></i>
                                <div>
                                    <h6>Live Server</h6>
                                    <small>Launch a development local server with live reload</small>
                                </div>
                            </div>
                            <div class="extension-item">
                                <i class="fab fa-html5 text-warning"></i>
                                <div>
                                    <h6>HTML CSS Support</h6>
                                    <small>CSS Intellisense for HTML</small>
                                </div>
                            </div>
                            <div class="extension-item">
                                <i class="fab fa-js-square text-warning"></i>
                                <div>
                                    <h6>JavaScript (ES6) Snippets</h6>
                                    <small>Code snippets for JavaScript ES6 syntax</small>
                                </div>
                            </div>
                            <div class="extension-item">
                                <i class="fas fa-palette text-info"></i>
                                <div>
                                    <h6>Prettier - Code Formatter</h6>
                                    <small>Code formatter using prettier</small>
                                </div>
                            </div>
                            <div class="extension-item">
                                <i class="fab fa-git-alt text-success"></i>
                                <div>
                                    <h6>GitLens</h6>
                                    <small>Supercharge Git capabilities</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer border-secondary">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Got it!</button>
                    </div>
                </div>
            </div>
        </div>
    `);
    
    $('#extensionsModal').remove();
    $('body').append(extensionsModal);
    const modal = new bootstrap.Modal(document.getElementById('extensionsModal'));
    modal.show();
    
    $('#extensionsModal').on('hidden.bs.modal', function() {
        $(this).remove();
    });
}

// Refresh page function
function refreshPage() {
    location.reload();
}

// ===== COMPREHENSIVE BUTTON HANDLERS =====

function setupAllButtonHandlers() {
    console.log('🔧 Setting up all button handlers...');
    
    // Remove all existing handlers first
    $(document).off('click', '#startCodingBtn');
    $(document).off('click', '#exploreProjectsBtn');
    $(document).off('click', '.tool-btn');
    $(document).off('click', '.tool-card');
    $(document).off('click', '#loadGithubProfile');
    
    // Hero buttons - multiple approaches
    $('#startCodingBtn').on('click', function(e) {
        e.preventDefault();
        console.log('🚀 Start Coding clicked via jQuery!');
        handleStartCoding();
    });
    
    $(document).on('click', '#startCodingBtn', function(e) {
        e.preventDefault();
        console.log('🚀 Start Coding clicked via delegation!');
        handleStartCoding();
    });
    
    $('#exploreProjectsBtn').on('click', function(e) {
        e.preventDefault();
        console.log('👁️ Explore Projects clicked via jQuery!');
        handleExploreProjects();
    });
    
    $(document).on('click', '#exploreProjectsBtn', function(e) {
        e.preventDefault();
        console.log('👁️ Explore Projects clicked via delegation!');
        handleExploreProjects();
    });
    
    // Tool buttons - multiple approaches
    $('.tool-btn').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const tool = $(this).data('tool');
        console.log('🛠️ Tool button clicked:', tool);
        if (tool && window.openTool) {
            window.openTool(tool);
        }
    });
    
    $(document).on('click', '.tool-btn', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const tool = $(this).data('tool');
        console.log('🛠️ Tool button clicked via delegation:', tool);
        if (tool && window.openTool) {
            window.openTool(tool);
        }
    });
    
    // Tool cards
    $('.tool-card').on('click', function(e) {
        if ($(e.target).hasClass('btn')) return; // Don't trigger if button clicked
        const tool = $(this).data('tool');
        console.log('📦 Tool card clicked:', tool);
        if (tool && window.openTool) {
            window.openTool(tool);
        }
    });
    
    $(document).on('click', '.tool-card', function(e) {
        if ($(e.target).hasClass('btn')) return; // Don't trigger if button clicked
        const tool = $(this).data('tool');
        console.log('📦 Tool card clicked via delegation:', tool);
        if (tool && window.openTool) {
            window.openTool(tool);
        }
    });
    
    // GitHub profile button
    $('#loadGithubProfile').on('click', function(e) {
        e.preventDefault();
        console.log('📱 GitHub profile button clicked!');
        if (githubProfileData) {
            displayGitHubProfile(githubProfileData);
        } else {
            loadGitHubProfile('stephenolaussen');
        }
    });
    
    $(document).on('click', '#loadGithubProfile', function(e) {
        e.preventDefault();
        console.log('📱 GitHub profile button clicked via delegation!');
        if (githubProfileData) {
            displayGitHubProfile(githubProfileData);
        } else {
            loadGitHubProfile('stephenolaussen');
        }
    });
    
    console.log('✅ All button handlers set up successfully');
}

// Individual handler functions
function handleStartCoding() {
    showLoadingIndicator();
    
    $('#startCodingBtn').html('<i class="fas fa-spinner fa-spin"></i> Opening VS Code...');
    
    setTimeout(() => {
        hideLoadingIndicator();
        $('#startCodingBtn').html('<i class="fas fa-code"></i> Start Coding');
        
        // Try to open VS Code
        openVSCode();
        
        showNotification('Opening VS Code with your project...', 'success');
        
        // Scroll to tools section
        $('html, body').animate({
            scrollTop: $('.quick-tools-section').offset().top - 100
        }, 1000);
    }, 1200);
}

function handleExploreProjects() {
    showLoadingIndicator();
    
    $('#exploreProjectsBtn').html('<i class="fas fa-spinner fa-spin"></i> Loading...');
    
    setTimeout(() => {
        hideLoadingIndicator();
        $('#exploreProjectsBtn').html('<i class="fas fa-eye"></i> Explore Projects');
        showNotification('Loading project gallery...', 'info');
        
        // Scroll to projects section
        $('html, body').animate({
            scrollTop: $('.projects-section').offset().top - 100
        }, 1000);
    }, 800);
}