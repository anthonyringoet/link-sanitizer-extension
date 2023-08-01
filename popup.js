var extensionAPI = typeof browser !== 'undefined' ? browser : chrome;

const stats = [
  'cleaned_urls_count',
  // specifics
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'fbclid',
  'gclid',
  '_hsenc',
  'mc_cid',
  'mc_eid',
  'igshid'
]

// Function to update the statistics in the popup
function updateStats() {
    extensionAPI.storage.local.get(stats, function(result) {
        stats.forEach(function(stat) {
          var contents = stat + ": " + (result[stat] || 0);

          if (stat === 'cleaned_urls_count') {
            contents = (result[stat] || 0);
          }

          document.getElementById(stat).textContent = contents;
        });
    });
}

// Function to reset the statistics
function resetStats() {
    extensionAPI.storage.local.clear(function() {
        updateStats();
    });
}

// Update stats when the popup is opened
updateStats();

document.getElementById('resetButton').onclick = resetStats;
