import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{

    @ViewChild("nav") nav!: ElementRef
    @ViewChild("navMenu") navMenu!: HTMLElement
    @ViewChild("btnToggleNav") btnToggleNav!: HTMLElement
    workEls = document.querySelectorAll(".work-box");
    workImgs = document.querySelectorAll(".work-img");
    @ViewChild("checkBox") checkBox!: HTMLInputElement
    @ViewChild("yearEl") yearEl!: HTMLElement
    skillsImages: Array<{ src: string, title: string }> = [
      {
        title: "Scala",
        src: "assets/images/skills/scala.svg"
      },
      {
        title: "Angular",
        src: "assets/images/skills/angular.svg"
      },
      {
        title: "Akka",
        src: "assets/images/skills/akka.svg"
      },
      {
        title: "Java",
        src: "assets/images/skills/java.svg"
      },
      {
        title: "MySQL",
        src: "assets/images/skills/mysql.svg"
      },
      {
        title: "Postgres",
        src: "assets/images/skills/postgres.svg"
      },
      {
        title: "Docker",
        src: "assets/images/skills/docker.svg"
      },
      {
        title: "PHP",
        src: "assets/images/skills/php.svg"
      },
      {
        title: "Primeng",
        src: "assets/images/skills/primeng.svg"
      },
    ]
    storedTheme = localStorage.getItem("theme");

    observer: IntersectionObserver

    constructor() {
        this.initWorkElementsObs()
        this.initImages()
        this.observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                const [textbox, picture] = Array.from(entry.target.children);
                if (entry.isIntersecting) {
                    picture.classList.remove("transform");
                    Array.from(textbox.children).forEach(
                        (el: any) => (el.style.animationPlayState = "running")
                    );
                }
            },
            {threshold: 0.3}
        );

    }

    ngAfterViewInit(): void {
        this.checkBox.checked = false
        this.yearEl.textContent = new Date().getFullYear().toString();
    }

    onToggleNav() {
        this.toggleNav();
    }

    toggleNav() {
        console.log(this.nav.nativeElement.classList)
        this.nav.nativeElement.classList.toggle("hidden");

        // Prevent screen from scrolling when menu is opened
        document.body.classList.toggle("lock-screen");

        if (this.nav.nativeElement.classList.contains("hidden")) {
            this.btnToggleNav.textContent = "menu";
        } else {
            // When menu is opened after transition change text respectively
            setTimeout(() => {
                this.btnToggleNav.textContent = "close";
            }, 475);
        }
    }

    onEscape($event: KeyboardEvent) {
        if ($event.key === "Escape" && !this.nav.nativeElement.classList.contains("hidden")) {
            this.toggleNav();
        }
    }

    private initWorkElementsObs() {
        this.workEls.forEach(element => {
            this.observer.observe((element))
        })
    }

    private initImages() {
        this.workImgs.forEach((workImg) => workImg.classList.add("transform"));
    }

    onSwichDarkMode() {
        if (this.checkBox.checked) {
            document.body.classList.add("dark");
            document.body.classList.remove("light");
            localStorage.setItem("theme", "dark");
        }else{
            document.body.classList.remove("dark");
            document.body.classList.add("light");
            localStorage.setItem("theme", "light");
            this.checkBox.checked = false;
        }
    }
}
