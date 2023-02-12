using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace minitwit_refac.Pages;

public class TimelineModel : PageModel
{
    private readonly ILogger<TimelineModel> _logger;

    public TimelineModel(ILogger<TimelineModel> logger)
    {
        _logger = logger;
    }

    public void OnGet()
    {

    }
}