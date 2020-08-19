#pragma checksum "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\DeletePulseMeasurement.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "957d47593ac692bc9e25799ac4354ad7d1dd0701"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Admin_Views_Patients_DeletePulseMeasurement), @"mvc.1.0.view", @"/Areas/Admin/Views/Patients/DeletePulseMeasurement.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"957d47593ac692bc9e25799ac4354ad7d1dd0701", @"/Areas/Admin/Views/Patients/DeletePulseMeasurement.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"54faf4e500dfe311828d6855b6069a4255360141", @"/_ViewImports.cshtml")]
    public class Areas_Admin_Views_Patients_DeletePulseMeasurement : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<Measurement>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-action", "PulseMeasurement", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("btn btn-primary"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("asp-action", "DeletePulseMeasurementConfirmed", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
#line 3 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\DeletePulseMeasurement.cshtml"
  
    ViewData["Title"] = "PulseMeasurement";

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n<h1>Pulse Measurement</h1>\r\n<h3>Are you sure you want to delete this?</h3>\r\n<hr />\r\n<dl class=\"row\">\r\n    <dt class=\"col-sm-2\">\r\n        ");
#nullable restore
#line 12 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\DeletePulseMeasurement.cshtml"
   Write(Html.DisplayNameFor(model => model.Patient.PatientId));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dt>\r\n    <dd class=\"col-sm-10\">\r\n        ");
#nullable restore
#line 15 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\DeletePulseMeasurement.cshtml"
   Write(Html.DisplayFor(model => model.Patient.PatientId));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dd>\r\n    <dt class=\"col-sm-2\">\r\n        ");
#nullable restore
#line 18 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\DeletePulseMeasurement.cshtml"
   Write(Html.DisplayNameFor(model => model.Patient.FirstName));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dt>\r\n    <dd class=\"col-sm-10\">\r\n        ");
#nullable restore
#line 21 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\DeletePulseMeasurement.cshtml"
   Write(Html.DisplayFor(model => model.Patient.FirstName));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dd>\r\n    <dt class=\"col-sm-2\">\r\n        ");
#nullable restore
#line 24 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\DeletePulseMeasurement.cshtml"
   Write(Html.DisplayNameFor(model => model.Patient.LastName));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dt>\r\n    <dd class=\"col-sm-10\">\r\n        ");
#nullable restore
#line 27 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\DeletePulseMeasurement.cshtml"
   Write(Html.DisplayFor(model => model.Patient.LastName));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dd>\r\n    <dt class=\"col-sm-2\">\r\n        ");
#nullable restore
#line 30 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\DeletePulseMeasurement.cshtml"
   Write(Html.DisplayNameFor(model => model.Patient.BirthDate));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dt>\r\n    <dd class=\"col-sm-10\">\r\n        ");
#nullable restore
#line 33 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\DeletePulseMeasurement.cshtml"
   Write(Html.DisplayFor(model => model.Patient.BirthDate));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dd>\r\n    <dt class=\"col-sm-2\">\r\n        ");
#nullable restore
#line 36 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\DeletePulseMeasurement.cshtml"
   Write(Html.DisplayNameFor(model => model.MeasurementId));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dt>\r\n    <dd class=\"col-sm-10\">\r\n        ");
#nullable restore
#line 39 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\DeletePulseMeasurement.cshtml"
   Write(Html.DisplayFor(model => model.MeasurementId));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dd>\r\n    <dt class=\"col-sm-2\">\r\n        ");
#nullable restore
#line 42 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\DeletePulseMeasurement.cshtml"
   Write(Html.DisplayNameFor(model => model.Pulse));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dt>\r\n    <dd class=\"col-sm-10\">\r\n        ");
#nullable restore
#line 45 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\DeletePulseMeasurement.cshtml"
   Write(Html.DisplayFor(model => model.Pulse));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dd>\r\n    <dt class=\"col-sm-2\">\r\n        ");
#nullable restore
#line 48 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\DeletePulseMeasurement.cshtml"
   Write(Html.DisplayNameFor(model => model.TimeStamp));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dt>\r\n    <dd class=\"col-sm-10\">\r\n        ");
#nullable restore
#line 51 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\DeletePulseMeasurement.cshtml"
   Write(Html.DisplayFor(model => model.TimeStamp));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </dd>\r\n</dl>\r\n<hr />\r\n<div id=\"line_chart\"\r\n     style=\"width: 1110px; height: 500px; margin: auto;\"></div>\r\n<hr />\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "957d47593ac692bc9e25799ac4354ad7d1dd070110334", async() => {
                WriteLiteral("Cancel");
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
#line 58 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\DeletePulseMeasurement.cshtml"
                                   WriteLiteral(Model.MeasurementId);

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
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("a", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "957d47593ac692bc9e25799ac4354ad7d1dd070112607", async() => {
                WriteLiteral("Delete measurement");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.Action = (string)__tagHelperAttribute_2.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_2);
            if (__Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.RouteValues == null)
            {
                throw new InvalidOperationException(InvalidTagHelperIndexerAssignment("asp-route-PulseMeasurementId", "Microsoft.AspNetCore.Mvc.TagHelpers.AnchorTagHelper", "RouteValues"));
            }
            BeginWriteTagHelperAttribute();
#nullable restore
#line 59 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\DeletePulseMeasurement.cshtml"
                                                                  WriteLiteral(Model.MeasurementId);

#line default
#line hidden
#nullable disable
            __tagHelperStringValueBuffer = EndWriteTagHelperAttribute();
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.RouteValues["PulseMeasurementId"] = __tagHelperStringValueBuffer;
            __tagHelperExecutionContext.AddTagHelperAttribute("asp-route-PulseMeasurementId", __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.RouteValues["PulseMeasurementId"], global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
            BeginWriteTagHelperAttribute();
#nullable restore
#line 59 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\DeletePulseMeasurement.cshtml"
                                                                                                             WriteLiteral(Model.Patient.PatientId);

#line default
#line hidden
#nullable disable
            __tagHelperStringValueBuffer = EndWriteTagHelperAttribute();
            __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.RouteValues["PatientId"] = __tagHelperStringValueBuffer;
            __tagHelperExecutionContext.AddTagHelperAttribute("asp-route-PatientId", __Microsoft_AspNetCore_Mvc_TagHelpers_AnchorTagHelper.RouteValues["PatientId"], global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "957d47593ac692bc9e25799ac4354ad7d1dd070116031", async() => {
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
#line 64 "D:\Pulpit\VisualStudioProjects\HealthyMan\HealthyMan\Areas\Admin\Views\Patients\DeletePulseMeasurement.cshtml"
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
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<Measurement> Html { get; private set; }
    }
}
#pragma warning restore 1591
