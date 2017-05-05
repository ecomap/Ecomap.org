angular.module('app.templates', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("app/templates/activity.html",
    "<div class=b-activity><div class=b-activity__filters><i ng-repeat=\"i in [1,2,3,4,5]\" ng-style=myStyle ng-click=\"filterActivity(i);myStyle={opacity:x}\" class=\"fa {{icons[i]}} b-activity__comments-item-image\" style=\"margin-left:5px;display: inline-block;float:left;font-size: 24px;margin:0;line-height: 30px\"></i></div><div ng-show=isLoggedIn() class=form-group><textarea class=form-control ng-model=commentContent rows=4 placeholder=\"Тут можна залишити свій коментарій...\" maxlength=500></textarea><p class=help-block>(залишилось {{500 - commentContent.length}} символів)</p><a href=\"\" type=button class=\"btn btn-default\" ng-click=addComment(commentContent)>Додати</a></div><div ng-show=!isLoggedIn() style=\"margin-top: 15px;margin-bottom: 15px\"><a class=tn-join-us style=\"cursor: pointer\" ng-click=\"showRegForm('')\">Зареєструйтесь</a> щоб залишити коментар</div><div class=b-activity__comments><div class=b-activity__comments-item ng-repeat=\"activity in activities\" ng-show=checkpoint[activity.ActivityTypes_Id]><i class=\"fa {{icons[activity.ActivityTypes_Id]}} b-activity__comments-item-image\" style=\"margin-left:5px;margin:0;padding:1px;display: inline-block;float:left;font-size: 24px;margin:0;line-height: 40px\"></i><div class=b-activity__comments-item-date><span><b>{{activity.Content.userName}} {{activity.Content.userSurname}}</b></span> <span><b>{{activity.Date.substring(0,10)}}<br>{{activity.Date.substring(11,16)}}</b></span></div><div class=b-activity__comments-item-content><span ng-show=\"activity.ActivityTypes_Id!=5\">{{activity.Content.Content}}</span> <span ng-show=\"activity.ActivityTypes_Id==5\">{{activity.Content.Content}} <i ng-if=isAdministrator() class=\"fa fa-close b-chat__newsItem-li-i\" ng-click=deleteComment(activity.Id)></i></span></div></div></div></div>");
  $templateCache.put("app/templates/addInfo.html",
    "<form><div class=form-group><label for=problemName>Назва проблеми:</label><input class=form-control id=problemName ng-model=problemData.title ng-trim=false maxlength=70 ng-required=true> <span class=help-block>(залишилось {{70 - problemData.title.length}} символів)</span><p class=help-block ng-show=\"problemData.title == ''\">Це поле обов’язкове.&nbsp;</p></div><div class=form-group><label for=select-field>Тип проблеми:</label><select id=select-field class=form-control required ng-model=problemData.type><option value=\"\" selected disabled>Виберіть тип</option><option value=1>Проблеми лісів</option><option value=2>Сміттєзвалища</option><option value=3>Незаконна забудова</option><option value=4>Проблеми водойм</option><option value=5>Загрози біорізноманіттю</option><option value=6>Браконьєрство</option><option value=7>Інші проблеми</option></select><p class=help-block ng-show=\"problemData.type == ''\">Це поле обов’язкове.</p></div><div class=form-group><label for=description-field>Опис проблеми:</label><textarea class=form-control id=description-field rows=6 ng-model=problemData.content ng-trim=false maxlength=1000 ng-required=true></textarea><span class=help-block>(залишилось {{1000 - problemData.content.length}} символів)</span></div><div class=form-group><label for=proposal-field>Пропозиції щодо вирішення проблеми:</label><textarea class=form-control id=proposal-field rows=6 ng-model=problemData.proposal ng-trim=false maxlength=1000 ng-required=true></textarea><span class=help-block>(залишилось {{1000 - problemData.proposal.length}} символів)</span></div><button class=\"btn btn-default btn-sm\" ng-click=\"tabs[2].active = true\">Далі</button></form>");
  $templateCache.put("app/templates/addMarker.html",
    "<div class=markerHeader>Відмітьте на карті місце розташування проблеми</div><a href=\"\" class=\"btn btn-default btn-sm fa fa-location-arrow findButton\" ng-click=locateUser()>&nbsp;Знайти мене</a> <button class=\"btn btn-default btn-sm\" ng-click=\"tabs[1].active = true\">Далі</button>");
  $templateCache.put("app/templates/addPhotos.html",
    "<form id=my-awesome-dropzone drop=dropzoneConfig class=dropzone><div class=previews><span><strong>Клікніть</strong> або перенесіть фото, щоб завантажити</span></div><div style=\"font-size: 0.8em\">Ще можна додати <b>{{fileCountLeft}}</b> фото, загальним розміром <b>{{fileSizeLeft}} МБ</b></div><button id=btn-submit class=\"btn btn-success btn-sm\" ng-disabled=requiredData()>Опублікувати</button> <input type=hidden name=title ng-value=problemData.title> <input type=hidden name=content ng-value=problemData.content> <input type=hidden name=proposal ng-value=problemData.proposal> <input type=hidden name=latitude ng-value=problemData.latitude> <input type=hidden name=longitude ng-value=problemData.longtitude> <input type=hidden name=type ng-value=problemData.type> <input style=\"display: none\" ng-model=userId name=\"userId\"> <input style=\"display: none\" ng-model=name name=\"userName\"> <input style=\"display: none\" ng-model=surname name=\"userSurname\"></form>");
  $templateCache.put("app/templates/addProblem.html",
    "<div class=b-addProblem name=submit_problem><a href=\"\" ng-click=swipeHide() class=close>×</a><h2 class=b-addProblem-header>Додати проблему</h2><tabset justified=true ng-model=tabs><tab ng-repeat=\"tab in tabs\" active=tab.active><tab-heading ng-click=getWindowDimensions()><i class={{tab.icon}}></i> {{tab.heading}}</tab-heading><div ng-if=tab.active><div ng-include=tab.content></div></div></tab></tabset></div>");
  $templateCache.put("app/templates/changePassword.html",
    "<alert ng-repeat=\"alert in alerts\" type={{alert.type}} close=closeAlert($index)>{{alert.msg}}</alert><div class=modal-header ng-hide=formHide><h3 class=modal-title>Зміна паролю:</h3></div><div class=modal-body ng-hide=formHide><form class=b-registration__form name=changePasswordForm ng-submit=submitForm(changePasswordForm.$valid) novalidate><div class=form-group><label for=old_password>Введіть старий пароль</label><input type=password id=old_password class=form-control name=old_password ng-model=user.old_password required><p ng-show=\"changePasswordForm.old_password.$error.required && !changePasswordForm.old_password.$pristine\" class=help-block>Це поле обов’язкове.</p><span class=help-block ng-bind=wrongPassword></span></div><div class=form-group><label for=new_password>Введіть новий пароль</label><input type=password id=new_password class=form-control name=new_password ng-model=user.new_password required><p ng-show=\"changePasswordForm.new_password.$error.required && !changePasswordForm.new_password.$pristine\" class=help-block>Це поле обов’язкове.</p></div><div class=form-group><label for=new_password_second>Повторіть новий пароль</label><input type=password id=new_password_second class=form-control name=new_password_second ng-model=user.new_password_second required><p ng-show=\"changePasswordForm.new_password_second.$error.required && !changePasswordForm.new_password_second.$pristine\" class=help-block>Це поле обов’язкове.</p><p ng-show=\"user.new_password != user.new_password_second && !changePasswordForm.new_password_second.$pristine\" class=help-block>Паролі не співпадають.</p></div><div class=modal-footer><input ng-disabled=\"!changePasswordForm.$valid || (user.new_password != user.new_password_second)\" type=submit value=\"Змінити пароль\" class=\"b-form__button\"></div></form></div>");
  $templateCache.put("app/templates/chat.html",
    "<div class=b-chat__container><a ng-href=#/map ng-click=swipeHide() class=close>×</a><div class=b-chat__currentNews><h3>Новини що відображаються зараз на сайті:</h3><ul class=b-chat__newsItem ng-repeat=\"news in message.logs\"><li class=b-chat__newsItem-li>{{news.Content}}</li><i class=\"fa fa-close b-chat__newsItem-li-i\" ng-click=sendMessage($index+1)></i></ul><p class=help-block ng-show=!message.logs.length>Немає новин</p></div><form role=form novalidate name=form><div class=form-group><label for=chatMessage>Додати повідомлення:</label><textarea class=form-control id=chatMessage ng-model=message.text rows=4 placeholder=\"Введіть текст повідомлення...\"></textarea><a href=#/chat class=\"btn btn-default\" role=button ng-enable=form.$valid ng-click=sendMessage(message.text)>Додати</a></div></form></div>");
  $templateCache.put("app/templates/editorPage.html",
    "<a href=#/map ng-click=swipeHide() class=close>×</a><form class=editor name=EditForm ng-submit=submitForm(EditForm.$valid) novalidate><div class=editor_left><label>Заголовок ресурсу:</label><input name=Title ng-model=Title ng-minlength=3 ng-maxlength=40 required><p class=validErr ng-if=\"EditForm.Title.$error.required && !EditForm.Title.$pristine\">Це поле обов'язкове для заповнення!</p></div><div class=editor_left><label>Alias для ресурсу:</label><input ng-model=Alias name=Alias required ng-pattern=\"/^[0-9a-zA-Z\\-]+$/\"><p class=validErr ng-if=EditForm.Alias.$error.pattern>Це поле може містити лише латинські літери, цифри та символ \"-\" !</p><p class=validErr ng-if=\"EditForm.Alias.$error.required && !EditForm.Alias.$pristine\">Це поле обов'язкове для заповнення!</p></div><div class=editor_horizontal><div text-angular=text-angular ta-toolbar=\"[['h2', 'h3', 'h4', 'p', 'pre', 'quote'],['bold', 'italics', 'underline', 'ul', 'ol', 'clear'],['justifyLeft','justifyCenter','justifyRight'],	['html', 'insertImage', 'insertLink', 'insertVideo']]\" name=htmlontent ng-model=Content class=editor_ta required></div><p class=validErr ng-if=\"EditForm.htmlontent.$error.required && !EditForm.htmlontent.$pristine\">Це поле обов'язкове для заповнення!</p></div><div class=editor_left><label>Де розмістити цей ресурс:</label><select ng-model=IsResource name=IsResource><option value=0>У верхньому меню</option><option value=1>В розділі \"Ресурси\"</option></select></div><div class=editor_left><button type=submit class=\"b-form__button editor_button\" type=submit ng-click=\"sendResource(Alias, Content, Title, IsResource, Id)\">Відправити</button><p class=validErr ng-if=errorMsq>{{errorMsq}}</p></div></form>");
  $templateCache.put("app/templates/filters.html",
    "<div class=b-container-filters-left><div class=info-problem-filters><div class=date-picker ng-controller=datePicker><div class=problem><p class=title>ФІЛЬТРАЦІЯ ЗА ДАТОЮ</p></div><div class=\"datepicker input-group\"><span class=input-group-btn><button type=button class=\"btn btn-default\" ng-click=\"toggleDt($event,'dt')\"><i class=\"fa fa-calendar\"></i> Показати з:</button></span> <input class=form-control uib-datepicker-popup={{format}} ng-model=todayTime.formDataDt is-open=datepickers.dt min-date=minDate max-date=todayTime.formDataDtSecond datepicker-options=dateOptions clear-text={{text.clear}} close-text={{text.close}} current-text={{text.today}} ng-required=true popup-placement=bottom-right ng-change=\"toggleSelection()\"></div><div class=\"datepicker input-group\"><span class=input-group-btn><button type=button class=\"btn btn-default\" ng-click=\"toggleDt($event, 'dtSecond')\"><i class=\"fa fa-calendar\"></i> Показати до:</button></span> <input class=form-control uib-datepicker-popup={{format}} ng-model=todayTime.formDataDtSecond is-open=datepickers.dtSecond min-date=todayTime.formDataDt max-date=formDataToday datepicker-options=dateOptions clear-text={{text.clear}} close-text={{text.close}} current-text={{text.today}} ng-required=true popup-placement=bottom-right ng-change=\"toggleSelection()\"></div></div><div class=\"problem controls\" ng-show=isLoggedIn()><input id=userProblems type=checkbox ng-model=placeUserProblemsChecker ng-change=toggleSelection()><label for=userProblems>Відобразити мої</label></div><div class=problem><p class=title>ТИП ПРОБЛЕМ</p><input ng-repeat-start=\"problemType in problemTypes\" id=\"{{'type' + problemType.id}}\" type=checkbox ng-model=problemType.selected ng-change=toggleSelection()><label ng-repeat-end for=\"{{'type' + problemType.id}}\">{{problemType.name}}</label></div><div class=problem><p class=title>СТАТУС ПРОБЛЕМ</p><input ng-repeat-start=\"problemStatus in problemStatuses\" id=\"{{'status' + problemStatus.id}}\" type=checkbox ng-model=problemStatus.selected ng-change=toggleSelection()><label ng-repeat-end for=\"{{'status' + problemStatus.id}}\">{{problemStatus.name}}</label></div></div></div><script id=template/datepicker/day.html type=text/ng-template><table role=\"grid\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "    <thead>\n" +
    "        <tr>\n" +
    "        <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"fa fa-chevron-left\"></i></button></th>\n" +
    "        <th colspan=\"{{5 + showWeeks}}\"><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    "        <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"fa fa-chevron-right\"></i></button></th>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "        <th ng-show=\"showWeeks\" class=\"text-center\"></th>\n" +
    "        <th ng-repeat=\"label in labels track by $index\" class=\"text-center\"><small aria-label=\"{{label.full}}\">{{label.abbr}}</small></th>\n" +
    "        </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "        <tr ng-repeat=\"row in rows track by $index\">\n" +
    "        <td ng-show=\"showWeeks\" class=\"text-center h6\"><em>{{ weekNumbers[$index] }}</em></td>\n" +
    "        <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\">\n" +
    "        <button type=\"button\" style=\"width:100%;\" class=\"btn btn-default btn-sm\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"{'text-muted': dt.secondary, 'text-info': dt.current}\">{{dt.label}}</span></button>\n" +
    "        </td>\n" +
    "        </tr>\n" +
    "    </tbody>\n" +
    "</table></script><script id=template/datepicker/month.html type=text/ng-template><table role=\"grid\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"fa fa-chevron-left\"></i></button></th>\n" +
    "      <th><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"fa fa-chevron-right\"></i></button></th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"row in rows track by $index\">\n" +
    "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\">\n" +
    "        <button type=\"button\" style=\"width:100%;\" class=\"btn btn-default\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"{'text-info': dt.current}\">{{dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table></script><script id=template/datepicker/year.html type=text/ng-template><table role=\"grid\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"fa fa-chevron-left\"></i></button></th>\n" +
    "      <th colspan=\"3\"><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"fa fa-chevron-right\"></i></button></th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"row in rows track by $index\">\n" +
    "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\">\n" +
    "        <button type=\"button\" style=\"width:100%;\" class=\"btn btn-default\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"{'text-info': dt.current}\">{{dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table></script><script id=template/datepicker/popup.html type=text/ng-template><ul class=\"dropdown-menu\" ng-style=\"{display: (isOpen && 'block') || 'none', top: position.top+'px', left: 11+'px'}\" ng-keydown=\"keydown($event)\">\n" +
    "    <li ng-transclude></li>\n" +
    "    <li ng-if=\"showButtonBar\" style=\"padding:10px 9px 2px\">\n" +
    "        <span class=\"btn-group\">\n" +
    "            <button type=\"button\" class=\"btn btn-sm btn-info\" ng-click=\"select('today')\">{{ getText('current') }}</button>\n" +
    "            <button type=\"button\" class=\"btn btn-sm btn-success\" ng-click=\"select(null)\">{{ getText('clear') }}</button>\n" +
    "            <button type=\"button\" class=\"btn btn-sm btn-danger\" ng-click=\"close()\">{{ getText('close') }}</button>\n" +
    "        </span>\n" +
    "    </li>\n" +
    "</ul></script>");
  $templateCache.put("app/templates/navbar.html",
    "<nav class=\"navbar navbar-default b-header\" role=navigation><slider></slider><div class=container-fluid><div class=navbar-header><div><a href=#/map ng-click=swipeHide()><img src=images/logo.png class=\"b-header__logo\"></a></div><button type=button class=navbar-toggle ng-init=\"navCollapsed = true\" ng-click=\"navCollapsed = !navCollapsed\"><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <button class=\"navbar-brand b-menu__button\" go-click=/problem/addProblem>Повідомити про проблему</button></div><div class=\"collapse navbar-collapse\" ng-class=\"!navCollapsed && 'in'\" ng-init=getTitles()><ul class=\"nav navbar-nav\"><li ng-repeat=\"title in data\" ng-if=!title.IsResource class=b-menu__button><a id=link href=#/resources/{{title.Alias}}>{{title.Title}}</a> <i class=\"fa fa-pencil fa-xs\" ng-if=isAdministrator() ng-click=editResource(title.Alias)></i> <i class=\"fa fa-trash fa-xs\" ng-if=isAdministrator() ng-click=deleteResource(title.Id)></i></li><li uib-dropdown><a uib-dropdown-toggle class=b-menu__button href=#>Ресурси <span class=\"fa fa-caret-down\"></span></a><ul uib-dropdown-menu id=b-header__resources><li ng-repeat=\"title in data\" ng-if=title.IsResource><a id=link href=#/resources/{{title.Alias}}>{{title.Title}}</a> <i class=\"fa fa-pencil\" ng-if=isAdministrator() ng-click=editResource(title.Alias)></i> <i class=\"fa fa-trash\" ng-if=isAdministrator() ng-click=deleteResource(title.Id,title.Title)></i></li><li ng-if=isAdministrator()><a href=#/addResource class=b-menu__button><i class=\"fa fa-plus\"></i> Додати новий ресурс</a></li></ul></li><li class=b-menu__button><a ng-href=#/statistic><i class=\"fa fa-pie-chart\"></i> Статистика</a></li><li uib-dropdown ng-hide=isLoggedIn()><a uib-dropdown-toggle class=b-menu__button href=#>Вхід <span class=\"fa fa-caret-down\"></span></a><ul uib-dropdown-menu id=b-header__login-menu stop-event=click><li><form name=login><div class=form-group><input class=form-control name=email required placeholder=Email></div><div class=form-group><input type=password class=form-control name=password required placeholder=Пароль></div><button type=submit value=Вхід ng-click=postLogIn() class=\"btn btn-default b-menu__button\" id=login-button>Вхід</button><div class=divider></div></form><div style=\"margin: 0 10px 0;padding-bottom: 5px\"><button class=\"btn btn-default\" style=border-radius:0 id=loginfb href=# ng-click=logInFB()><i class=\"fa fa-facebook-square fa-lg\"></i> Вхід</button> <button class=\"btn btn-default\" style=border-radius:0 id=register-button href=# ng-click=\"open('')\">Реєстрація</button> <a href=# ng-click=resetPassword()>Забули пароль?</a></div></li></ul></li><li class=b-menu__button ng-if=isAdministrator()><a ng-href=#/chat ng-click=swipeHide()><i class=\"fa fa-weixin\"></i> Новини</a></li><li><user></user></li></ul><ul class=\"nav navbar-nav navbar-right\" ng-show=isLoggedIn()><li uib-dropdown><a uib-dropdown-toggle class=b-menu__button><i class=\"fa fa-user\"></i> {{name}} {{surname}} <span class=\"fa fa-caret-down\"></span></a><ul uib-dropdown-menu><li><a class=b-menu__button ng-click=changePassword() href=\"/\"><i class=\"fa fa-wrench\"></i> Змінити пароль</a></li><li><a class=b-menu__button ng-click=logOut() href=\"/\"><i class=\"fa fa-sign-out\"></i> Вийти</a></li></ul></li></ul></div></div></nav>");
  $templateCache.put("app/templates/notApproved.html",
    "<div class=b-new-problem-list ng-controller=notApprovedCtrl ng-if=isAdministrator() ng-hide=!notApproved.length><div class=b-new-problem-list__caption>СПИСОК НОВИХ ПРОБЛЕМ</div><ul class=b-new-problem-list-items><li class=b-new-items__item ng-repeat=\"problem in notApproved\" ng-click=showProblem(problem)><div class=b-new-item__title>{{problem.Title}}</div><div class=b-new-item__buttons><ul class=b-buttons><li class=\"b-buttons__button fa fa-check\" ng-click=approveProblem(problem)></li><li class=\"b-buttons__button fa fa-remove\" ng-click=deleteProblem(problem)></li></ul></div></li></ul></div>");
  $templateCache.put("app/templates/rating.html",
    "<div><span ng-mouseleave=reset()><i ng-repeat=\"r in range\" ng-mouseenter=\"enter($index + 1)\" ng-click=\"rate($index + 1)\" class=glyphicon ng-class=\"$index < val && (r.stateOn || 'glyphicon-star') || (r.stateOff || 'glyphicon-star-empty')\"></i></span></div>");
  $templateCache.put("app/templates/register.html",
    "<alert ng-repeat=\"alert in alerts\" type={{alert.type}} close=closeAlert($index)>{{alert.msg}}</alert><div class=modal-header ng-hide=formHide><h3 class=modal-title>Реєстрація:</h3></div><div class=modal-body ng-hide=formHide><form class=b-registration__form name=registerForm ng-submit=submitForm(registerForm.$valid) novalidate><div class=form-group><label for=first_name>Ім’я</label><input id=first_name class=form-control name=first_name ng-model=user.first_name ng-minlength=3 ng-maxlength=40 required><p ng-show=\"registerForm.first_name.$error.required && !registerForm.first_name.$pristine\" class=help-block>Це поле обов’язкове.</p><p ng-show=registerForm.first_name.$error.minlength class=help-block>Ім’я має бути не менше ніж 3 символи.</p><p ng-show=registerForm.first_name.$error.maxlength class=help-block>Ім’я має бути не довше ніж 45 символів.</p></div><div class=form-group><label for=last_name>Прізвище</label><input id=last_name class=form-control name=last_name ng-model=user.last_name ng-minlength=3 ng-maxlength=45 required><p ng-show=\"registerForm.last_name.$error.required && !registerForm.last_name.$pristine\" class=help-block>Це поле обов’язкове.</p><p ng-show=registerForm.last_name.$error.minlength class=help-block>Прізвище має бути не менше ніж 3 символи.</p><p ng-show=registerForm.last_name.$error.maxlength class=help-block>Прізвище має бути не довше ніж 45 символів.</p></div><div class=form-group><label for=email>Пошта</label><input ng-pattern=\"/^[a-z]+[a-z0-9._]+@[a-z]+\\.[a-z.]{2,5}$/\" type=email id=email class=form-control name=email ng-model=user.email required><p ng-show=\"registerForm.email.$error.required && !registerForm.email.$pristine\" class=help-block>Це поле обов’язкове.</p><p ng-show=\"registerForm.email.$invalid && !registerForm.email.$pristine\" class=help-block>Введіть коректну пошту.</p><span class=help-block ng-bind=wrongEmail></span></div><div class=form-group><label for=password>Пароль</label><input type=password id=password class=form-control name=password ng-model=user.password required><p ng-show=\"registerForm.password.$error.required && !registerForm.password.$pristine\" class=help-block>Це поле обов’язкове.</p></div><div class=form-group><label for=password_second>Повторіть пароль</label><input type=password id=password_second class=form-control name=password_second ng-model=user.password_second required><p ng-show=\"registerForm.password_second.$error.required && !registerForm.password_second.$pristine\" class=help-block>Це поле обов’язкове.</p><p ng-show=\"user.password != user.password_second && !registerForm.password_second.$pristine\" class=help-block>Паролі не співпадають.</p></div><p ng-show=\"registerForm.last_name.$error.required || registerForm.last_name.$error.required || registerForm.email.$error.required || registerForm.password.$error.required || registerForm.password_second.$error.required\" class=help-block>Заповніть, будь ласка, усі поля.</p><div class=modal-footer><input ng-disabled=\"!registerForm.$valid || (user.password != user.password_second)\" type=submit value=Зареєструватися! class=\"b-form__button\"></div></form></div>");
  $templateCache.put("app/templates/resetPassword.html",
    "<alert ng-repeat=\"alert in alerts\" type={{alert.type}} close=closeAlert($index)>{{alert.msg}}</alert><div class=modal-header ng-hide=formHide><h3 class=modal-title>Відновлення паролю:</h3></div><div class=modal-body ng-hide=formHide><form class=b-registration__form name=resetPasswordForm ng-submit=submitForm(resetPasswordForm.$valid) novalidate><div class=form-group><label for=email>Введіть вашу пошту</label><input ng-pattern=\"/^[a-z]+[a-z0-9._]+@[a-z]+\\.[a-z.]{2,5}$/\" type=email id=email class=form-control name=email ng-model=user.email required><p ng-show=\"resetPasswordForm.email.$error.required && !resetPasswordForm.email.$pristine\" class=help-block>Це поле обов’язкове.</p><p ng-show=\"resetPasswordForm.email.$invalid && !resetPasswordForm.email.$pristine\" class=help-block>Введіть коректну пошту.</p><span class=help-block ng-bind=wrongEmail></span></div><div class=form-group><label for=surname>Введіть ваше прізвище</label><input id=surname class=form-control name=surname ng-model=user.surname required><p ng-show=\"resetPasswordForm.surname.$error.required && !resetPasswordForm.surname.$pristine\" class=help-block>Це поле обов’язкове.</p><span class=help-block ng-bind=wrongSurname></span></div><div class=modal-footer><input ng-disabled=!resetPasswordForm.$valid type=submit value=\"Змінити пароль\" class=\"b-form__button\"></div></form></div>");
  $templateCache.put("app/templates/resources.html",
    "<div class=resource><a href=#/map ng-click=swipeHide() class=close>×</a><h1 ng-bind-html=resource.Title></h1><div ta-bind ng-model=resource.Content></div></div>");
  $templateCache.put("app/templates/showProblem.html",
    "<div class=b-right-side__show-problem><a href=\"\" ng-click=swipeHide() class=close>×</a><div class=b-problems><div class=b-problem-deatiled-info-title><a ng-click=\"map.panToOffset(problem.Coordinates, 0, 0, 600, 0)\" href=\"\"><img ng-src={{path}} class=b-problem-deatiled-info-title__icon></a><div class=\"b-problem-deatiled-info-title__text b-problem-notAdmin_{{!isAdministrator()}}\"><editproblemtitle value=problem.Title></editproblemtitle></div><div class=b-problem-deatiled-info-user><div class=b-problem-deatiled-info-user__name>{{problem.userName}}</div><div class=b-problem-deatiled-info-user__date>{{problem.CreatedDate | date:'dd/MM/yyyy HH:MM'}}</div></div></div><div class=b-problem-deatiled-info-general><div class=b-label-overRating ng-class=\"{'label-default': value<2,'label-info':value>=2&&value<3, 'label-warning': value>=3 && value<4, 'label-danger': value>=4}\" ng-show=showStatus>{{severityMessage}}</div><div class=b-problem-deatiled-info-container><div class=b-problem-deatiled-info-severity><div ng-class=\"{'b-hide-stars':!isAdministrator()}\" ng-mouseover=showMessageOverRating(problem.Severity) ng-mouseleave=hideSeverityLabel()></div><div class=\"b-problem-deatiled-info__severity b-problem-notAdmin_{{!isAdministrator()}}\" ng-init=problem.Severity><rating ng-model=problem.Severity on-hover=showMessageOverRating(value) on-leave=\"showStatus = false\" readonly state-on=\"'fa-star'\" state-off=\"'fa-star-o'\"></rating></div></div><rating ng-model=rate max=max readonly on-hover=hoveringOver(value) on-leave=\"overStar = null\"></rating><div class=b-problem-deatiled-info-status__text><div class=onoffswitch><input type=checkbox name=onoffswitch class=onoffswitch-checkbox id=myonoffswitch ng-model=checkedbox ng-checked=checkedbox ng-disabled=!isAdministrator()><label class=\"onoffswitch-label onoffswitch-label-notAdmin_{{!isAdministrator()}}\" for=myonoffswitch><span class=onoffswitch-inner></span> <span class=onoffswitch-switch></span></label></div></div><div class=b-problem-deatiled-info-votes><button class=simple_like_img ng-init=\"myvalue = false\" ng-mousemove=\"myvalue= true\" ng-mouseleave=\"myvalue= false\" ng-click=addOneVote() ng-disabled=disableVoteButton><div class=b-hintVote ng-class=\"{' label-success': myvalue}\" ng-hide=!myvalue||disableVoteButton>Голосувати</div><span><i class=\"fa fa-fw\" ng-class=\"{'simple_like_img-disable':disableVoteButton}\"></i></span></button> {{problem.Votes}}</div></div></div><tabset justified=true class=b-problem-tab><tab heading=Детально class=b-problem-notAdmin_false><div class=b-problem-deatiled-info-description><div class=b-problem-deatiled-info-description__title></div><div class=\"b-problem-deatiled-info-description__content b-problem-notAdmin_{{!isAdministrator()}}\"><label>Опис проблеми:</label><br><editproblemcontent value=problem.Content></editproblemcontent></div><div class=\"b-problem-deatiled-info-description__content b-problem-notAdmin_{{!isAdministrator()}}\"><label>Пропозиції щодо вирішення:</label><br><editproblemcontent value=problem.Proposal></editproblemcontent></div><div class=b-problem-deatiled-info-description-photos><div class=show_photo ng-repeat=\"photo in photos\"><img ng-click=showSliderFunc() ng-src=photos/large/{{photo.Link}} class=\"b-details-body-problem-photo\"> <i class=\"fa fa-check show_photo_label_{{photo.Status}}\"></i> <i ng-if=isAdministrator() class=\"fa fa-close show_photo_delete_lavel_{{isAdministrator()}}\" ng-click=deletePhoto($index)></i></div><div class=dropFieldForShowProblem style=\"width: 100px\"><div ng-if=isLoggedIn() class=b-details-body-problem-photo_add ng-click=showDrop() ng-show=showAddPhotoButton>+ Додати фото</div></div><div ng-if=!isLoggedIn() style=\"margin-top: 10px\"><a class=tn-join-us style=\"cursor: pointer\" ng-click=\"showRegForm('')\">Зареєструйтесь</a> щоб додати фото</div><form id=addPhotoDropzone class=\"dropzone b-add-problem-form\" name=upload_photo drop=dropzoneConfig ng-show=showDropField><input style=\"display: none\" ng-model=userId name=\"userId\"> <input style=\"display: none\" ng-model=name name=\"userName\"> <input style=\"display: none\" ng-model=surname name=\"userSurname\"><div class=\"previews previews_show\"><p><span class=b-conteiner__drop-title-1><strong>+ Перемістить сюди фото або натисніть</strong></span></p></div><div style=\"font-size: 0.8em\">Ще можна додати <b>{{fileCountLeft}}</b> фото, загальним розміром <b>{{fileSizeLeft}} МБ</b></div><div class=b-details-body__status><label style=\"cursor: pointer\"><input style=\"cursor: pointer;margin-top: 2px\" type=checkbox name=solveProblemMark> Проблема вже вирішена?</label></div><input id=btn-submit type=button class=\"b-add-problem-button btn-forward-step-3 b-public\" value=Додати> <input id=btn-reload type=button ng-click=hideAddPhotoForm() class=\"b-add-problem-button btn-forward-step-3 b-public\" value=Звернути></form></div></div></tab><tab heading=Коментарі class=b-problem-notAdmin_false><activity></activity></tab></tabset><div class=b-commandButtons-group><button type=button class=\"btn btn-sm {{editStatusClass}}\" ng-click=\"saveChangestoDb(problem.Title,problem.Severity, problem.Status, problem.Content,problem.Proposal)\">Збережіть зміни</button> <button type=button class=\"btn {{addStatus}} btn-sm\" ng-click=addProblemToDB()>Додати проблему до бази</button> <button type=button class=\"btn {{delStatus}} btn-sm\" ng-click=deleteProblemFromDb()>Видалити проблему з бази</button></div></div></div>");
  $templateCache.put("app/templates/slider.html",
    "<div ng-if=showSlider><div class=slider-fon ng-show=showSlider ng-click=hideSlider()></div><div class=\"container slider\" ng-show=showSlider><i class=\"fa fa-close close\" style=\"top:0px; right:0px;z-index: 5;color:#fff;opacity:1\" ng-click=hideSlider()></i><ul style=\"height:500px;position: relative\" rn-carousel rn-carousel-control rn-carousel-indicator class=image><li style=\"height:500px;position: relative\" ng-repeat=\"slide in slides\" ng-style=\"{ backgroundImage: 'url(' + slide.image + ')' }\"><i class=\"fa fa-check show_photo_label_{{slide.status}}\" style=\"position: absolute;right:20px\"></i><div style=color:#fff;margin-top:500px class=layer>{{ slide.text }}</div></li></ul></div></div>");
  $templateCache.put("app/templates/statistic.html",
    "<close-button></close-button><div class=statistic><div class=topProblems><div class=col-md-4><h2>ТОП 10 популярних проблем</h2><br><ul class=topItem><a ng-repeat=\"popular in mostPopular\" ng-href=/#/problem/showProblem/{{popular.Id}}><li>{{$index+1}}. {{popular.Title}}<p><i class=\"fa fa-fw\"></i>{{popular.Votes}}</p></li></a></ul></div><div class=col-md-4><h2>ТОП 10 важливих проблем</h2><br><ul class=topItem><a ng-repeat=\"important in mostImportant\" ng-href=/#/problem/showProblem/{{important.Id}}><li>{{$index+1}}. {{important.Title}}<p><i class=\"fa fa-star\"><span class=sr-only>(*)</span></i> {{important.Severity}}</p></li></a></ul></div><div class=col-md-4><h2>ТОП 10 обговорюваних проблем</h2><br><ul class=topItem><a ng-repeat=\"comment in mostComment\" ng-href=/#/problem/showProblem/{{comment.Id}}><li>{{$index+1}}. {{comment.Title}}<p><i class=\"fa fa-pencil\"></i> {{comment.value}}</p></li></a></ul></div></div><h2>Статистика за весь час</h2><ul class=mainStats><li><span>{{problems}}</span><br>Проблем</li><li><span>{{votes}}</span><br>Голосів</li><li><span>{{comments}}</span><br>Коментарів</li><li><span>{{photos}}</span><br>Фотографій</li></ul><h2 class=light>Кількість доданих проблем за останній <span class=periodItem ng-class=style.D ng-click=\"pie('D')\">день</span> | <span class=periodItem ng-class=style.W ng-click=\"pie('W')\">тиждень</span> | <span class=periodItem ng-class=style.M ng-click=\"pie('M')\">місяць</span> | <span class=periodItem ng-class=style.Y ng-click=\"pie('Y')\">рік</span><br><span class=periodItem ng-class=style.A ng-click=\"pie('A')\">за весь час</span><br></h2><div class=pie><svg id=el2 ng-init=\"pie('A')\"></svg></div><ul class=legend ng-init=\"color = ['#095B0F', '#231F20', '#98442B', '#1B9AD6', '#71BF44', '#FFAB09', '#50095B']\"><li ng-repeat=\"types in problemTypes\"><svg width=12 height=12><rect width=12 height=12 style=\"fill:{{color[$index]}}\"></svg> - {{types.name}}</li></ul><h2>Хронологія публікацій та голосів</h2><ul class=legend><li><svg width=5 height=15><rect width=5 height=15 style=\"fill:#f00; opacity: 0.5\"></svg> - Додано проблему</li><li><svg width=5 height=15><rect width=5 height=15 style=\"fill:#00f; opacity: 0.5\"></svg> - Додано голос</li></ul><svg id=el1 ng-init=chart()></svg></div>");
  $templateCache.put("app/templates/userChatLine.html",
    "<div ng-show=showNewsContainer class=chat-user-label><div ng-if=!trigger ng-repeat=\"messageLog in message.chat\" ng-style={display:block} style=\"text-align: left;margin: 6px 0 0 20px\"><span style=\"font-size: 0.6em\">{{messageLog.date}}</span><br><span><b>{{messageLog.userName}}</b> залишив коментар до&nbsp;</span><a href=#/problem/showProblem/{{messageLog.problemID}}>проблеми</a></div><div ng-if=trigger ng-repeat=\"messageLog in message.logs\" ng-style={display:messageLog.show} style=\"text-align: left;margin:0 0 0 20px\" class=chat-user-label{{messageLogHide}}><span style=\"font-size: 0.6em\">Термінове повідомлення:</span><br><b>{{messageLog.Content}}</b></div></div>");
}]);
