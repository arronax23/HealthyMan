#pragma checksum "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\PulseMeasurement.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "ea27dfa0d99f4dd6c20402f0ba7dd6aa9dbe6577"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Admin_Views_Patients_PulseMeasurement), @"mvc.1.0.view", @"/Areas/Admin/Views/Patients/PulseMeasurement.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\_ViewImports.cshtml"
using HealthyMan;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\_ViewImports.cshtml"
using HealthyMan.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ea27dfa0d99f4dd6c20402f0ba7dd6aa9dbe6577", @"/Areas/Admin/Views/Patients/PulseMeasurement.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"54faf4e500dfe311828d6855b6069a4255360141", @"/_ViewImports.cshtml")]
    public class Areas_Admin_Views_Patients_PulseMeasurement : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<PulseMeasurement>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-action", "Patient", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("btn btn-primary"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-action", "DeletePulseMeasurement", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("btn btn-danger"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/js/rednerPulseLineChart.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
#nullable restore
#line 3 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\PulseMeasurement.cshtml"
  
    ViewData["Title"] = "PulseMeasurement";

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n<h1>Pulse Measurement</h1>\r\n<hr />\r\n<dl class=\"row\">\r\n    <dt class=\"col-sm-2\">\r\n        ");
#nullable restore
#line 11 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\PulseMeasurement.cshtml"
   Write(Html.DisplayNameFor(model => model.Patient.PatientId));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dt>\r\n    <dd class=\"col-sm-10\">\r\n        ");
#nullable restore
#line 14 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\PulseMeasurement.cshtml"
   Write(Html.DisplayFor(model => model.Patient.PatientId));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dd>\r\n    <dt class=\"col-sm-2\">\r\n        ");
#nullable restore
#line 17 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\PulseMeasurement.cshtml"
   Write(Html.DisplayNameFor(model => model.Patient.FirstName));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dt>\r\n    <dd class=\"col-sm-10\">\r\n        ");
#nullable restore
#line 20 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\PulseMeasurement.cshtml"
   Write(Html.DisplayFor(model => model.Patient.FirstName));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dd>\r\n    <dt class=\"col-sm-2\">\r\n        ");
#nullable restore
#line 23 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\PulseMeasurement.cshtml"
   Write(Html.DisplayNameFor(model => model.Patient.LastName));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dt>\r\n    <dd class=\"col-sm-10\">\r\n        ");
#nullable restore
#line 26 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\PulseMeasurement.cshtml"
   Write(Html.DisplayFor(model => model.Patient.LastName));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dd>\r\n    <dt class=\"col-sm-2\">\r\n        ");
#nullable restore
#line 29 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\PulseMeasurement.cshtml"
   Write(Html.DisplayNameFor(model => model.Patient.BirthDate));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dt>\r\n    <dd class=\"col-sm-10\">\r\n        ");
#nullable restore
#line 32 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\PulseMeasurement.cshtml"
   Write(Html.DisplayFor(model => model.Patient.BirthDate));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dd>\r\n    <dt class=\"col-sm-2\">\r\n        ");
#nullable restore
#line 35 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\PulseMeasurement.cshtml"
   Write(Html.DisplayNameFor(model => model.PulseMeasurementId));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dt>\r\n    <dd class=\"col-sm-10\">\r\n        ");
#nullable restore
#line 38 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\PulseMeasurement.cshtml"
   Write(Html.DisplayFor(model => model.PulseMeasurementId));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dd>\r\n    <dt class=\"col-sm-2\">\r\n        ");
#nullable restore
#line 41 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\PulseMeasurement.cshtml"
   Write(Html.DisplayNameFor(model => model.Pulse));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dt>\r\n    <dd class=\"col-sm-10\">\r\n        ");
#nullable restore
#line 44 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\PulseMeasurement.cshtml"
   Write(Html.DisplayFor(model => model.Pulse));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dd>\r\n    <dt class=\"col-sm-2\">\r\n        ");
#nullable restore
#line 47 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\PulseMeasurement.cshtml"
   Write(Html.DisplayNameFor(model => model.TimeStamp));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dt>\r\n    <dd class=\"col-sm-10\">\r\n        ");
#nullable restore
#line 50 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\PulseMeasurement.cshtml"
   Write(Html.DisplayFor(model => model.TimeStamp));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dd>\r\n</dl>\r\n<hr />\r\n<div id=\"line_chart\"\r\n     style=\"width: 1110px; height: 500px; margin: auto;\"></div>\r\n<hr />\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "ea27dfa0d99f4dd6c20402f0ba7dd6aa9dbe657710161", async() => {
                WriteLiteral("Back");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Action = (string)__tagHelperAttribute_0.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
            if (__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.RouteValues == null)
            {
                throw new InvalidOperationException(InvalidTagHelperIndexerAssignment("asp-route-id", "Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper", "RouteValues"));
            }
            BeginWriteTagHelperAttribute();
#nullable restore
#line 57 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\PulseMeasurement.cshtml"
                          WriteLiteral(Model.Patient.PatientId);

#line default
#line hidden
#nullable disable
            __tagHelperStringValueBuffer = EndWriteTagHelperAttribute();
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.RouteValues["id"] = __tagHelperStringValueBuffer;
            __tagHelperExecutionContext.AddTagHelperAttribute("asp-route-id", __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.RouteValues["id"], global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(" |\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "ea27dfa0d99f4dd6c20402f0ba7dd6aa9dbe657712421", async() => {
                WriteLiteral("Delete measurement");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Action = (string)__tagHelperAttribute_2.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_2);
            if (__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.RouteValues == null)
            {
                throw new InvalidOperationException(InvalidTagHelperIndexerAssignment("asp-route-id", "Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper", "RouteValues"));
            }
            BeginWriteTagHelperAttribute();
#nullable restore
#line 58 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\PulseMeasurement.cshtml"
                                          WriteLiteral(Model.PulseMeasurementId);

#line default
#line hidden
#nullable disable
            __tagHelperStringValueBuffer = EndWriteTagHelperAttribute();
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.RouteValues["id"] = __tagHelperStringValueBuffer;
            __tagHelperExecutionContext.AddTagHelperAttribute("asp-route-id", __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.RouteValues["id"], global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n");
            DefineSection("Scripts", async() => {
                WriteLiteral("\r\n    <script type=\"text/javascript\"\r\n            src=\"https://www.gstatic.com/charts/loader.js\"></script>\r\n    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "ea27dfa0d99f4dd6c20402f0ba7dd6aa9dbe657714922", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_4);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n    <script>renderPulseLineChart(");
#nullable restore
#line 63 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\PulseMeasurement.cshtml"
                            Write(Html.Raw(Json.Serialize(Model)));

#line default
#line hidden
#nullable disable
                WriteLiteral(")</script>\r\n");
            }
            );
            WriteLiteral("\r\n");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<PulseMeasurement> Html { get; private set; }
    }
}
#pragma warning restore 1591
